const { Students } = require("../models");

module.exports = async ({ level, educationPlan, course = "1" }) => {
  try {
    const students = await Students.find({
      level,
      educationPlan,
      course: Number.parseInt(course),
    }).populate("department");
    return students;
  } catch (err) {
    console.log(err);
    return null;
  }
};
