const router = require("express").Router();
const ctrl = require("../controllers/event.controller");
const auth = require("../middlewares/auth.middleware");
const isAdmin = require("../middlewares/isAdmin.middleware");

// Admin
router.post("/", auth, isAdmin, ctrl.create);
router.put("/:id", auth, isAdmin, ctrl.update);
router.delete("/:id", auth, isAdmin, ctrl.delete);

// Client
router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getDetail);

module.exports = router;
