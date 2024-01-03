const { getStudentByDepartmant } = require("../DBActions");

module.exports = async (event, depID) => {
  const result = await getStudentByDepartmant({ depID });
  return JSON.stringify(result);
};
