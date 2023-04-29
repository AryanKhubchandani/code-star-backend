const Sequelize = require("sequelize-cockroachdb");
const sequelize = require("../config/connection");

module.exports = (sequelize, DataTypes) => {
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
  return Details;
};
