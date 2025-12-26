const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking"
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event"
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  ticketCode: {
    type: String,
    unique: true,
    required: true
  },

  qrCode: String,

  isUsed: {
    type: Boolean,
    default: false
  },
  
  usedAt: Date,

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Ticket", ticketSchema);
