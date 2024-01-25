const { createEducationPlan } = require("../DBActions");
module.exports = async (event, data) => {
  const result = await createEducationPlan(data);
  return JSON.stringify(result);
};
