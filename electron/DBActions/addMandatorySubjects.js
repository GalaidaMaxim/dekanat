const { Subjects, Departments, Students } = require("../models");

module.exports = async (studentId) => {
  const student = await Students.findById(studentId).populate("department");
  const madatorySubjects = await Subjects.find({
    department: student.department._id,
    mandatory: true,
    level: student.level,
  });
  madatorySubjects.forEach((item) => {
    if (student.subjects.every((sub) => sub.name !== item.name)) {
      student.subjects.push(item);
    }
  });
  await student.save();
  return student;
};
