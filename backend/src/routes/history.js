const router = require("express").Router();
const auth = require("../middleware/auth");
const controller = require("../controllers/historyController");

router.get("/summary", auth, controller.summary);

module.exports = router;