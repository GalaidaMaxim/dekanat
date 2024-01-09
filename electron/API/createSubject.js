const { createSubjecet } = require("../DBActions");

module.exports = async (event, student) => {
  const result = await createSubjecet(student);
  return JSON.stringify(result);
};
