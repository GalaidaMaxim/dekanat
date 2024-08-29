const { User } = require("../models");
const { checkPassword } = require("../service");
const { createAppMenu } = require("../AppMenu");

module.exports = async ({ login, password }) => {
  const user = await User.findOne({ login });
  if (!user) {
    return null;
  }
  if (!checkPassword(password, user.password)) {
    return null;
  }
  if (!user.active) {
    return null;
  }
  const time = Date.now();
  user.lastLoginTime = time;
  user.lastLogoutTime = time;
  process.userId = user._id;
  await user.save();
  createAppMenu();
  return user;
};
