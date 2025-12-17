const express = require("express");
const router = express.Router();
const { createCheckout } = require("../controllers/payment.controller");
const auth = require("../middlewares/auth.middleware");

router.post("/create-checkout", auth, createCheckout);

module.exports = router;
