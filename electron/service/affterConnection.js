const { State, EducationPlan, Subjects } = require("../models");

module.exports = async () => {
  //   const plans = await EducationPlan.find();
  //   for (let i = 0; i < plans.length; i++) {
  //     let increment = 1;
  //     const subjectsOfPlan = await Subjects.find({ educationPlan: plans[i]._id });
  //     for (let j = 0; j < subjectsOfPlan.length; j++) {
  //       subjectsOfPlan[j].sortNumber = increment;
  //       await subjectsOfPlan[j].save();
  //       increment += 1;
  //       console.log(`${plans[i].name} ready`);
  //     }
  //   }
};
