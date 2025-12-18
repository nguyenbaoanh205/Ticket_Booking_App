const router = require("express").Router();
const ctrl = require("../controllers/booking.controller");
const auth = require("../middlewares/auth.middleware");

router.post("/", auth, ctrl.create);

module.exports = router;
