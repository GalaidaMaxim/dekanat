const { EducationPlan } = require("../models");

module.exports = async ({ id = null }) => {
  try {
    let result;

    if (!id) {
      result = await EducationPlan.find();
    } else {
      result = await EducationPlan.findById(id);
    }
    if (!result) {
      return null;
    }
    console.log("there");
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
};
