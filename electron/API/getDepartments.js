const { getDepartments } = require("../DBActions");

module.exports = async () => {
  const res = await getDepartments();
  return JSON.stringify(res);
};
