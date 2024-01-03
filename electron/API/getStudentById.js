const { getStudentById } = require("../DBActions");

module.exports = async (event, id) => {
  const result = await getStudentById(id);
  console.log(result);
  return JSON.stringify(result);
};
