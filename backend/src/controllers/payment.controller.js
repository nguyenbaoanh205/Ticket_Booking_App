const stripe = require("../config/stripe");
const Booking = require("../models/Booking");
const generateQR = require("../utils/generateQR");
const sendTicketMail = require("../utils/sendTicketMail");
const User = require("../models/User");
const Event = require("../models/Event");

exports.createCheckout = async (req, res) => {
    try {
        const { bookingId } = req.body;

        const booking = await Booking.findById(bookingId).populate("eventId");

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        if (booking.status === "paid") {
            return res.status(400).json({ message: "Booking already paid" });
        }

        const event = booking.eventId;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            client_reference_id: booking._id.toString(), // 👈 thêm dòng này
            line_items: [
                {
                    price_data: {
                        currency: "vnd",
                        product_data: {
                            name: event.title,
                            description: event.location
                        },
                        unit_amount: event.price // nhớ là đơn vị VND
                    },
                    quantity: 1
                }
            ],
            success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
            metadata: {
                bookingId: booking._id.toString()
            }
        });

        // ✅ LƯU session ID
        booking.stripeSessionId = session.id;
        await booking.save();

        res.json({ url: session.url });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Stripe error" });
    }
};


exports.webhook = async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error("❌ Webhook error:", err.message);
        return res.status(400).send("Webhook Error");
    }

    console.log("🔥 EVENT:", event.type);

    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const bookingId = session.client_reference_id; // 👈 đổi chỗ này

        if (!bookingId) {
            console.error("❌ Missing bookingId");
            return res.json({ received: true });
        }

        // Tìm booking theo ID
        const booking = await Booking.findById(bookingId).populate("eventId userId");

        if (!booking) {
            console.error("❌ Booking not found:", bookingId);
            return res.json({ received: true });
        }

        if (booking.status === "paid") {
            return res.json({ received: true });
        }

        // Tạo mã vé
        const ticketCode = `TICKET-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        // Tạo mã QR
        const qrPayload = {
            bookingId: booking._id.toString(),
            userId: booking.userId._id.toString(),
            ticketCode: ticketCode
        };

        const qrImagePath = await generateQR(
            qrPayload,
            `booking_${booking._id}`
        );

        // Cập nhật trạng thái booking
        booking.status = "paid";
        booking.ticketCode = ticketCode;
        booking.qrCode = qrImagePath;
        await booking.save();

        // Gửi email vé
        await sendTicketMail({
            to: booking.userId.email,
            userName: booking.userId.name,
            event: booking.eventId,
            ticketCode,
            qrCode: qrImagePath
        });

        console.log("✅ Paid + QR + Email sent:", bookingId);

    }


    res.json({ received: true });
};

