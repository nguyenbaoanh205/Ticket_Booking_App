const router = require("express").Router();

const ctrl = require("../controllers/ticket.controller");
const auth = require("../middlewares/auth.middleware");

router.get("/my-tickets", auth, ctrl.getMyTickets);

module.exports = router;