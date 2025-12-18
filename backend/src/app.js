const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(
  "/qrs",
  express.static(path.join(__dirname, "public/qrs"))
);

app.post(
  "/api/payments/webhook",
  express.raw({ type: "application/json" }),
  require("./controllers/payment.controller").webhook
);

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/events", require("./routes/event.route"));
app.use("/api/bookings", require("./routes/booking.route"));
app.use("/api/payments", require("./routes/payment.route"));

app.use("/api/admin", require("./routes/admin.route"));

module.exports = app;
