const Sequelize = require("sequelize-cockroachdb");
const sequelize = require("../config/connection");

const History = sequelize.define("history", {
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

History.associate = (models) => {
  History.hasMany(models.Details, {
    onDelete: "cascade",
  });
};

History.sync({ force: true })
  .then(() => {
    console.log("History table created");
  })
  .catch((err) => console.log(err));

module.exports = History;
