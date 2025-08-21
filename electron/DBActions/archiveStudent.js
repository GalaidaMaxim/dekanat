const { Students } = require("../models");
const Student = require("../models/Student");
const { archiveStudentFunction } = require("../service");
const path = require("path");

module.exports = async ({ studentID, pathToSave }) => {
  console.log(studentID, pathToSave);

  const student = await Student.findById(studentID).populate("department");
  const filePath = path.join(
    pathToSave,
    `${student.name} ${student.sername} ${student.department.name} ${student.startYear}.json`
  );
  await archiveStudentFunction({ student, pathToSave: filePath });
};
