const { Subjects } = require("../models");

module.exports = async ({ educationPlan }) => {
  try {
    const subjects = Subjects.find({ educationPlan });
    if (!subjects) {
      return null;
    }
    return subjects;
  } catch (err) {
    console.log(err);
    return null;
  }
};
