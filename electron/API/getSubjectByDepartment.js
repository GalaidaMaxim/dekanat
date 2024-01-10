const { getSubjectByDepartmant } = require("../DBActions");

module.exports = async (event, params) => {
  const result = await getSubjectByDepartmant(params);
  return JSON.stringify(result);
};
