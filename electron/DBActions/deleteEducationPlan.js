const { EducationPlan, Subjects } = require("../models");

module.exports = async ({ planID }) => {
  try {
    const subjects = await Subjects.find({ educationPlan: planID });
    for (let i = 0; i < subjects.length; i++) {
      await Subjects.findByIdAndDelete(subjects[i]._id);
    }
    const result = await EducationPlan.findByIdAndDelete(planID);
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
};
