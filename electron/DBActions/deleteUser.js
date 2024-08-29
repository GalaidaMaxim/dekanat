const { User } = require("../models");

module.exports = async ({ id }) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return null;
  }
  return user;
};
