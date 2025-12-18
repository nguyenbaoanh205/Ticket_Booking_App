const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(
  "/qrs",
  express.static(path.join(__dirname, "public/qrs"))
);

// ✅ WEBHOOK PHẢI ĐỨNG TRƯỚC express.json
app.post(
  "/api/payments/webhook",
  express.raw({ type: "application/json" }),
  require("./controllers/payment.controller").webhook
);

// Middleware thường
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/events", require("./routes/event.route"));
app.use("/api/bookings", require("./routes/booking.route"));
app.use("/api/payments", require("./routes/payment.route"));

module.exports = app;
