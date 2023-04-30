const Sequelize = require("sequelize-cockroachdb");
const sequelize = require("../config/connection");

module.exports = (sequelize, DataTypes) => {
  const Audio = sequelize.define("audio", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    download_url: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    time: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return Audio;
};
