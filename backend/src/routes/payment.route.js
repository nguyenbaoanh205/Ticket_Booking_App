const express = require("express");
const router = express.Router();
const { createCheckout } = require("../controllers/payment.controller");
const auth = require("../middlewares/auth.middleware");

// Webhook đã được khai báo trực tiếp trong `app.js`
router.post("/create-checkout", auth, createCheckout);

module.exports = router;
