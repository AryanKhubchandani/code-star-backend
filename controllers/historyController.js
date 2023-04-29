const History = require("../models/History");

module.exports.history_get = async (req, res) => {
  const user_id = req.params.user_id;
  try {
    const historyInstance = await History.findOne({
      user_id,
    });
    if (!historyInstance) {
      error = "No Expense History found";
      console.log(error);
      return res.status(404).send(error);
    } else {
      return res.send({
        history: historyInstance.details,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send(err.message);
  }
};
