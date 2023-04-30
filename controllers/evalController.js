const { sentences, urls } = require("../models/Evaluation");
const db = require("../models/index");
const User = db.user;
const Details = db.details;

module.exports.eval_get = async (req, res) => {
  const user_id = req.query.user_id;
  const type = req.query.type;
  try {
    addNewExpense(type, "Expense", 20, user_id);
    console.log("Added new expense");
  } catch (err) {
    console.log(err);
    return res.sendStatus(500).send(err.message);
  }
  try {
    if (type == "Reading") {
      const random = get3Random(sentences);
      return res.send({
        sentences: random,
      });
    } else if (type == "Writing") {
      return res.send({
        urls: urls,
      });
    } else {
      return res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send(err.message);
  }
};

function get3Random(sentences) {
  const random = [];
  for (let i = 0; i < 3; i++) {
    const index = Math.floor(Math.random() * sentences.length);
    random.push(sentences[index]);
  }
  return random;
}

async function addNewExpense(test, typeOf, amount, user_id) {
  const amt = Number(amount);
  try {
    const user = await User.findOne({ where: { id: user_id } });
    if (user) {
      const newDetails = {
        message: `Attempted ${test} test`,
        type: typeOf,
        time: new Date().toLocaleString(),
        cost: "$" + amount,
      };
      Details.create({ ...newDetails, user_id: user.id }).then((details) => {
        console.log(details);
      });
    } else {
      console.log("User not found");
    }
  } catch (err) {
    console.log(err);
  }
}
