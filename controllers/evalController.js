const { sentences, urls } = require("../models/Evaluation");
const db = require("../models/index");
const History = db.history;
const Details = db.details;

module.exports.eval_get = async (req, res) => {
  const user_id = req.query.user_id;
  const type = req.query.type;
  Details.findOne({ history_id: user_id }).then((history) => {
    console.log("THIS IS FULL");
    console.log(history);
  });

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

async function addNewExpense(test, type, amount, user_id) {
  const amt = Number(amount);
  try {
    const history = await History.findOne({ user_id: user_id });
    if (history) {
      const newDetails = {
        message: "You took a " + test + " test",
        type: type,
        time: new Date().toLocaleString(),
        cost: "$" + amount,
      };
      Details.create({ ...newDetails, history_id: history.user_id }).then(
        (details) => {
          console.log(details);
        }
      );

      //   history.details.push(newDetails);
      //   history.save();
    } else {
      const newHistory = History.create({ user_id: user_id });
      const newDetails = {
        message: "You took a " + test + " test",
        type: type,
        time: new Date().toLocaleString("en-us", {
          timeZone: "IST",
        }),
        cost: "$" + amount,
      };
      Details.create({ ...newDetails, history_id: newHistory.user_id }).then(
        (details) => {
          console.log(details);
        }
      );
    }
  } catch (err) {
    console.log(err);
  }
}
