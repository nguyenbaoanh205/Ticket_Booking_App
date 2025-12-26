const Ticket = require("../../models/Ticket");

exports.checkInByQR = async (req, res) => {
  try {
    const { ticketCode } = req.body;

    if (!ticketCode) {
      return res.status(400).json({ message: "Missing ticketCode" });
    }

    const ticket = await Ticket.findOne({ ticketCode })
      .populate({
        path: "bookingId",
        select: "status",
        populate: [
          { path: "userId", select: "name email" },
          { path: "eventId", select: "title" }
        ]
      });

    if (!ticket) {
      return res.status(404).json({ message: "❌ Vé không tồn tại" });
    }

    if (ticket.bookingId.status !== "paid") {
      return res.status(400).json({ message: "❌ Vé chưa thanh toán" });
    }

    if (ticket.isUsed) {
      return res.status(400).json({ message: "❌ Vé đã được sử dụng" });
    }

    ticket.isUsed = true;
    ticket.usedAt = new Date();
    await ticket.save();

    return res.json({
      message: "✅ Check-in thành công",
      ticketCode: ticket.ticketCode,
      user: ticket.bookingId.userId.name,
      event: ticket.bookingId.eventId.title,
      usedAt: ticket.usedAt
    });

  } catch (err) {
    console.error("❌ Check-in error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
