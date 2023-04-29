const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports.signup_post = async (req, res) => {
  const { username, password } = req.body;
  try {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    User.sync({ force: true })
      .then(() => {
        return User.create({
          username: username,
          password: hash,
        });
      })
      .then((newUser) => {
        console.log(newUser.toJSON());
        return res.status(201).json({ user: newUser.id });
      });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err.message);
  }
};

module.exports.login_post = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.authenticate(username, password);
    return res.status(200).json({ user: user.id });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err.message);
  }
};
