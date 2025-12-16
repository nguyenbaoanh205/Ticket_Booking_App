const stripe = require("../config/stripe");
const Booking = require("../models/Booking");
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
            line_items: [
                {
                    price_data: {
                        currency: "vnd",
                        product_data: {
                            name: event.title,
                            description: event.location
                        },
                        // unit_amount: event.price // nhớ là đơn vị VND
                        unit_amount: event.price * 100
                    },
                    quantity: 1
                }
            ],
            success_url: `${process.env.FRONTEND_URL}/payment-success`,
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
    console.log("👉 webhook hit");
    console.log("👉 body type:", typeof req.body);
    console.log("👉 body length:", req.body?.length);


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

        if (session.payment_status === "paid") {
            const bookingId = session.metadata.bookingId;

            await Booking.findByIdAndUpdate(bookingId, {
                status: "paid"
            });

            console.log("✅ Booking paid:", bookingId);
        }
    }

    res.json({ received: true });
};

