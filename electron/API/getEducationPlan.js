const { getEducationPlan } = require("../DBActions");

module.exports = async (event, data) => {
  const result = await getEducationPlan(data);
  return JSON.stringify(result);
};
