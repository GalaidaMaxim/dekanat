const { getStudentById } = require("../DBActions");

module.exports = async (event, id) => {
  const result = await getStudentById(id);
  return JSON.stringify(result);
};
