const { Students, Departments } = require("../models");
const addMandatorySubejct = require("./addMandatorySubjects");

const createStudent = async ({
  name,
  sername,
  secondName,
  level,
  course,
  department,
}) => {
  try {
    console.log(department);
    const departmentObj = await Departments.findOne({ name: department });
    const newStudent = await Students.create({
      name,
      sername,
      secondName,
      level,
      course,
      department: departmentObj._id,
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
