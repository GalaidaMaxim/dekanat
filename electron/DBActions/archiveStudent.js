const { Students } = require("../models");
const Student = require("../models/Student");
const { archiveStudentFunction } = require("../service");

module.exports = async ({ studentID, pathToSave }) => {
  const student = await Student.findById(studentID);
  await archiveStudentFunction({ studentID, pathToSave });
};
