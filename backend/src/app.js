const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/events", require("./routes/event.route"));
app.use("/api/bookings", require("./routes/booking.route"));
app.use("/api/payments", require("./routes/payment.route"));

module.exports = app;