const Sequelize = require("sequelize-cockroachdb");
const sequelize = require("../config/connection");

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
    type: Sequelize.NUMBER,
    allowNull: false,
  },
});

Details.associate = (models) => {
  Details.belongsTo(models.History, {});
};

Details.sync({ force: true })
  .then(() => {
    console.log("Details table created");
  })
  .catch((err) => console.log(err));

module.exports = Details;
