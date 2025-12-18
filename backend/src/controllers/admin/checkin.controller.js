const Booking = require("../../models/Booking");
const Event = require("../../models/Event");
const User = require("../../models/User");

exports.checkInByQR = async (req, res) => {
  try {
    const { bookingId } = req.body;

    if (!bookingId) {
      return res.status(400).json({ message: "Missing bookingId" });
    }

    const booking = await Booking.findById(bookingId)
      .populate("userId", "name email")
      .populate("eventId", "title");

    if (!booking) {
      return res.status(404).json({ message: "❌ Vé không tồn tại" });
    }

    if (booking.status !== "paid") {
      return res.status(400).json({ message: "❌ Vé chưa thanh toán" });
    }

    if (booking.isUsed) {
      return res.status(400).json({ message: "❌ Vé đã được sử dụng" });
    }

    // ✅ Đánh dấu vé đã dùng
    booking.isUsed = true;
    booking.usedAt = new Date();
    await booking.save();

    res.json({
      message: "✅ Check-in thành công",
      ticketCode: booking.ticketCode,
      user: booking.userId.name,
      event: booking.eventId.title
    });

  } catch (err) {
    console.error("❌ Check-in error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
