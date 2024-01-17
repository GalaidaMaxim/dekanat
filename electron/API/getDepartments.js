const { getDepartments } = require("../DBActions");

module.exports = async (event, id) => {
  const res = await getDepartments(id);
  return JSON.stringify(res);
};
