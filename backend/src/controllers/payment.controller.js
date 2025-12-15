const stripe = require("../config/stripe");
const Booking = require("../models/Booking");
const Event = require("../models/Event");

exports.createCheckout = async (req, res) => {
    try {
        const { bookingId } = req.body;

        // 1. Lấy booking
        const booking = await Booking.findById(bookingId).populate("eventId");

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        if (booking.status === "paid") {
            return res.status(400).json({ message: "Booking already paid" });
        }

        const event = booking.eventId;

        // 2. Tạo Stripe session
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
                        unit_amount: event.price
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

        res.json({ url: session.url });
    } catch (error) {
        console.error(err);
        res.status(500).json({ message: "Stripe error" });
    }
}