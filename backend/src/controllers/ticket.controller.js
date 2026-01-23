const Ticket = require("../models/Ticket");

exports.getMyTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({
      userId: req.user._id
    })
      .populate("eventId")
      .populate("bookingId")
      .sort({ createdAt: -1 });

    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
