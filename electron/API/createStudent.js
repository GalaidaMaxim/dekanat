const { createStudent } = require("../DBActions");

module.exports = async (event, student) => {
  const result = await createStudent(student);
  return JSON.stringify(result);
};
