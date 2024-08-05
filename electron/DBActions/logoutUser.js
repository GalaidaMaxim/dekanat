const { User } = require("../models");

module.exports = async ({ _id } = {}) => {
  if (!_id) {
    _id = process.userId;
  }
  if (!_id) {
    return null;
  }
  const user = await User.findById(_id);
  if (!user) {
    return null;
  }
  user.lastLogoutTime = Date.now();
  process.userId = undefined;
  await user.save();
};
