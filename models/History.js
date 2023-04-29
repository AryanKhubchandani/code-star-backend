const Sequelize = require("sequelize-cockroachdb");
const sequelize = require("../config/connection");
const Details = require("./Details");

module.exports = (sequelize, DataTypes) => {
  const History = sequelize.define("history", {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });

  return History;
};
