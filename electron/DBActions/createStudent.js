const { Students, Departments } = require("../modes");

const createStudent = async ({ name, sername, secondName, depID }) => {
  try {
    const department = await Departments.findOne({ name: depID });
    const newStudent = await Students.create({
      name,
      sername,
      secondName,
      department: department._id,
    });
    console.log(newStudent);
    return "OKS";
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = createStudent;
