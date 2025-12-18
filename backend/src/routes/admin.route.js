const router = require("express").Router();
const { checkInByQR } = require("../controllers/admin/checkin.controller");
const auth = require("../middlewares/auth.middleware");
const isAdmin = require("../middlewares/isAdmin.middleware");

router.post("/checkin", auth, isAdmin, checkInByQR);

module.exports = router;
