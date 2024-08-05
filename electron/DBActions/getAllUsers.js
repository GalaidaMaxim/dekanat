const { User } = require("../models");

module.exports = async () => {
  const users = await User.find();
  if (!users) {
    return null;
  }
  return users;
};
