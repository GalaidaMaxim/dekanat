const { User } = require("../models");

module.exports = async ({ id }) => {
  const user = await User.findByIdAndDelete(id);
  await createAction({
    info: JSON.stringify({ id }),
    type: "deleteUser",
  });
  if (!user) {
    return null;
  }
  return user;
};
