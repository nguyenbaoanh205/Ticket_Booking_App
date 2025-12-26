const Booking = require("../models/Booking");
const Event = require("../models/Event");

exports.create = async (req, res) => {
  const { eventId, quantity } = req.body;

  const event = await Event.findById(eventId);
  if (!event) return res.status(404).json({ message: "Event not found" });

  if (event.availableTickets < quantity) {
    return res.status(400).json({ message: "Không đủ vé" });
  }

  const booking = await Booking.create({
    userId: req.user.id,
    eventId,
    quantity,
    totalPrice: event.price * quantity,
    status: "pending"
  });

  res.json(booking);
};
