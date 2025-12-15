const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  location: String,
  date: Date,
  price: Number,
  totalTickets: Number,
  availableTickets: Number
});

module.exports = mongoose.model("Event", eventSchema);
