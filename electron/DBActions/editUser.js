const { User, createAction } = require("../models");

module.exports = async ({ id, params }) => {
  console.log(id, params);
  const user = await User.findByIdAndUpdate(id, params, { new: true });
  await createAction({
    info: JSON.stringify({ id, params }),
    type: "editUser",
  });
  if (!user) {
    return null;
  }
  return user;
};
