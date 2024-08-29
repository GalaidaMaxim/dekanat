const { User } = require("../models");

module.exports = async ({ id, params }) => {
  console.log(id, params);
  const user = await User.findByIdAndUpdate(id, params, { new: true });
  if (!user) {
    return null;
  }
  return user;
};
