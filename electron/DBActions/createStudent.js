const { Students, Departments } = require("../models");
const addMandatorySubejct = require("./addMandatorySubjects");

const createStudent = async ({
  name,
  sername,
  secondName,
  depID,
  level,
  course,
}) => {
  try {
    const department = await Departments.findOne({ name: depID });
    const newStudent = await Students.create({
      name,
      sername,
      secondName,
      level,
      course,
      department: department._id,
    });
    if (!newStudent) {
      return null;
    }
    const processed = await addMandatorySubejct(newStudent._id);
    return processed;
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = createStudent;
