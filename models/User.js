const Sequelize = require("sequelize-cockroachdb");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

const User = sequelize.define("users", {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

User.authenticate = async function (username, password) {
  const user = await User.findOne({ username: username });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Incorrect password");
  }
  throw Error("Incorrect username");
};

module.exports = User;
