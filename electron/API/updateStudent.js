const { updateStudent } = require("../DBActions");

module.exports = async (event, { id, info }) => {
  const result = await updateStudent(id, info);
  return JSON.stringify(result);
};
