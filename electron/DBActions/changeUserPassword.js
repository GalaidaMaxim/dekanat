const { User } = require("../models");
const { encriptPassword } = require("../service");

module.exports = async ({ id, password }) => {
  const user = await User.findById(id);

  if (!user) {
    return null;
  }

  user.password = await encriptPassword(password);
  await user.save();

  return user;
};
