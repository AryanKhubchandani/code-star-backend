const Sequelize = require("sequelize-cockroachdb");
const sequelize = require("../config/connection");
const History = require("./History");

const Details = sequelize.define("details", {
  message: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  time: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cost: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Details.belongsTo(History, {
  foreignKey: "history_id",
  as: "history",
});

Details.sync({})
  .then(() => {
    console.log("Details table created");
  })
  .catch((err) => console.log(err));

module.exports = Details;
