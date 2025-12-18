const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event"
  },
  status: {
    type: String,
    enum: ["pending", "paid", "failed", "cancelled", "used"],
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  qrCode: String,
  ticketCode: String,
  stripeSessionId: String,
});

module.exports = mongoose.model("Booking", bookingSchema);
