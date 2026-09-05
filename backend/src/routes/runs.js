const router = require("express").Router();
const auth = require("../middleware/auth");
const controller = require("../controllers/runController");

router.get("/", auth, controller.list);
router.post("/", auth, controller.create);

module.exports = router;