const Booking = require("../models/Booking");

exports.create = async (req, res) => {
  const booking = await Booking.create({
    userId: req.user._id,
    eventId: req.body.eventId,
    status: "pending",
    ticketCode: "TICKET_" + Date.now()
  });

  res.json(booking);
};
