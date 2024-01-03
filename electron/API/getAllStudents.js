const { getAllStudents } = require("../DBActions");

module.exports = async () => {
  const result = await getAllStudents();
  return JSON.stringify(result);
};
