const { Students } = require("../models");

module.exports = async ({ educationPlan }) => {
  try {
    const students = await Students.find({
      educationPlan,
    });
    return students;
  } catch (err) {
    console.log(err);
    return null;
  }
};
