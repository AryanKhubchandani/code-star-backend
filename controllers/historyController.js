const { where } = require("sequelize-cockroachdb");
const db = require("../models/index");
const User = db.user;
const Details = db.details;

module.exports.history_get = async (req, res) => {
  const user_id = req.params.user_id;
  try {
    const user = await User.findOne({ id: user_id });
    const details = await Details.findAll({ where: { user_id: user.id } });
    if (details.length == 0 || !details) {
      error = "No Expense History found";
      console.log(error);
      return res.status(404).send(error);
    } else {
      return res.send({
        history: details,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send(err.message);
  }
};
