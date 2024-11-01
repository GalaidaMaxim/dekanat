const { Students } = require("../models");

module.exports = async ({
  level,
  department,
  educationPlan,
  course = "1",
  status = "навчається",
}) => {
  try {
    const students = await Students.find({
      level,
      department,
      educationPlan,
      course: Number.parseInt(course),
      status,
    });
    console.log({
      level,
      department,
      educationPlan,
      course: Number.parseInt(course),
      status,
    });

    console.log(students);

    return students;
  } catch (err) {
    console.log(err);
    return null;
  }
};
