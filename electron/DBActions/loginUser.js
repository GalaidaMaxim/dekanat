const { User } = require("../models");
const { checkPassword } = require("../service");

module.exports = async ({ login, password }) => {
  const user = await User.findOne({ login });
  if (!user) {
    return null;
  }
  if (!checkPassword(password, user.password)) {
    return null;
  }
  return user;
};
