const { Students, Departments } = require("../models");
const addMandatorySubejct = require("./addMandatorySubjects");

const createStudent = async ({
  name,
  sername,
  secondName,
  level,
  course,
  department,
  educationPlan,
  foreigner,
}) => {
  try {
    const newStudent = await Students.create({
      name,
      sername,
      secondName,
      level,
      course,
      department,
      educationPlan,
      foreigner,
    });
    if (!newStudent) {
      return null;
    }
    const processed = await addMandatorySubejct(newStudent);
    return processed;
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = createStudent;
