const { Router } = require("express");
const historyController = require("../controllers/historyController");

const router = new Router();

router.get("/history", historyController.history_get);

module.exports = router;
