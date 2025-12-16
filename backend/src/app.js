const express = require("express");
const cors = require("cors");

const app = express();

// ❗ WEBHOOK PHẢI ĐỨNG ĐẦU
app.post(
  "/api/payments/webhook",
  express.raw({ type: "application/json" }),
  require("./controllers/payment.controller").webhook
);

// 👉 CHỈ parse JSON cho các route khác
app.use((req, res, next) => {
  if (req.originalUrl === "/api/payments/webhook") {
    next();
  } else {
    express.json()(req, res, next);
  }
});

app.use(cors());

// routes
app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/events", require("./routes/event.route"));
app.use("/api/bookings", require("./routes/booking.route"));
app.use("/api/payments", require("./routes/payment.route"));

module.exports = app;
