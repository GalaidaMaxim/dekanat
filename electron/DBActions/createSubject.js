const { Subjects, Departments } = require("../models");

const createSubject = async ({
  name,
  department,
  level,
  credits,
  semesters,
  gos,
  mandatory,
}) => {
  try {
    const dep = await Departments.findById(department);
    const result = await Subjects.create({
      name,
      department: dep._id,
      level,
      credits,
      semesters,
      gos,
      mandatory,
    });
    if (!result) {
      return null;
    }
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = createSubject;
