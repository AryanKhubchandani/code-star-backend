const Sequelize = require("sequelize-cockroachdb");
const sequelize = require("../config/connection");
const Users = require("./User");

module.exports = (sequelize, DataTypes) => {
  const Audio = sequelize.define("audio", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    download_url: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    time: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return Audio;
};
