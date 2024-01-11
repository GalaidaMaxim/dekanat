const { addMandatorySubjects } = require("../DBActions");

module.exports = async (event, id) => {
  const result = await addMandatorySubjects(id);
  return JSON.stringify(result);
};
