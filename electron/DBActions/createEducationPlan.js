const { EducationPlan } = require("../models");

module.exports = async ({ name, level }) => {
  try {
    const result = await EducationPlan.create({ name, level });
    if (!result) {
      return null;
    }
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
};
