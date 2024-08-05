const bcrypt = require("bcrypt");

const encriptPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const checkPassword = async (password, hash) => {
  const result = bcrypt.compareSync(password, hash);
  return result;
};

module.exports = {
  encriptPassword,
  checkPassword,
};
