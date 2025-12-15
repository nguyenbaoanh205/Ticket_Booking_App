const router = require("express").Router();
const ctrl = require("../controllers/booking.controller");

router.post("/", ctrl.create);

module.exports = router;
