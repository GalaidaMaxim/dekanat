const { User } = require("../models");
const { encriptPassword } = require("../service");

module.exports = async ({ name, sername, password, premissions, login }) => {
  await User.create({
    name,
    sername,
    premissions,
    login,
    password: await encriptPassword(password),
  });
};
