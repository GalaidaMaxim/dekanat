const { User } = require("../models");
const { encriptPassword } = require("../service");

module.exports = async ({
  name,
  secondName,
  sername,
  password,
  premissions,
  login,
}) => {
  await User.create({
    name,
    sername,
    secondName,
    premissions,
    login,
    password: await encriptPassword(password),
  });
};
