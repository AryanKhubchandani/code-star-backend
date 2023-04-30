const { Router } = require("express");
const historyController = require("../controllers/historyController");

const [
  createNewUserFx,
  createNewAudioFileFx,
  evaluateYourselfFx,
  getBalanceFx,
] = require("../../scripts/contract");

const router = new Router();

router.get("/history", historyController.history_get);

router.get("/getBalance", async (req, res) => {
  const userID = req.query.userID;
  const balance = await getBalanceFx(userID);
  res.status(200).send({
    balance: parseInt(balance, 10),
  });
});

module.exports = router;
