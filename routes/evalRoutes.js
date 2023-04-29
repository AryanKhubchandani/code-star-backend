const { Router } = require("express");
const evalController = require("../controllers/evalController");

const router = new Router();

router.get("/eval", evalController.eval_get);

module.exports = router;
