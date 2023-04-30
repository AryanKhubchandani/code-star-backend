const { Router } = require("express");
const t2sController = require("../controllers/t2sController");

const router = new Router();

router.post("/synth-audio", t2sController.synthAudio);
router.get("/get-audio", t2sController.getAudio);

module.exports = router;
