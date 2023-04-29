const History = require("../models/History");

module.exports.history_get = async (req, res) => {
  const user_id = req.params.user_id;
  try {
    const historyInstance = await History.findOne({
      user_id,
    });
    if (!historyInstance) {
      err = "No Expense History found";
      console.log(err);
      return res.sendStatus(404).send(err);
    } else {
      res.send({
        history: historyInstance.details,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send(err.message);
  }
};
