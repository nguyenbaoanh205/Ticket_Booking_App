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
  qrCode: String,
  ticketCode: String,
  stripeSessionId: String,
  usedAt: {
    type: Date,
    default: null
  }, // thời gian sử dụng vé
  isUsed: {
    type: Boolean,
    default: false
  }, // trạng thái vé đã sử dụng
  createdAt: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model("Booking", bookingSchema);
