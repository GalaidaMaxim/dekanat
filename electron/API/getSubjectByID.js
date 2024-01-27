const { getSubjectByID } = require("../DBActions");

module.exports = async (event, data) => {
  const result = await getSubjectByID(data);
  return JSON.stringify(result);
};
