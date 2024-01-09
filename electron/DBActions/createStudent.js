const { Students, Departments } = require("../models");

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
    return newStudent;
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = createStudent;
