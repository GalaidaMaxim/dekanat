const { User } = require("../models");

module.exports = async ({ params = {} }) => {
  const users = await User.find(params, "-password");
  if (!users) {
    return null;
  }
  return users;
};
