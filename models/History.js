const Sequelize = require("sequelize-cockroachdb");
const sequelize = require("../config/connection");

const History = sequelize.define("history", {
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

History.hasMany(models.Details, {
  as: "details",
});

History.sync({ force: true })
  .then(() => {
    console.log("History table created");
  })
  .catch((err) => console.log(err));

module.exports = History;
