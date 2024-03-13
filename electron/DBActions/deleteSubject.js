const { Subjects, Students } = require("../models");

module.exports = async ({ subjectId }) => {
  try {
    const subject = await Subjects.findByIdAndDelete(subjectId);
    if (!subject) {
      return null;
    }
    const students = await Students.find({
      educationPlan: subject.educationPlan,
    });
    console.log(subject);
    students.forEach((item) => {
      for (let i = 0; i < item.subjects.length; i++) {
        if (item.subjects[i]._id.toString() === subject._id.toString()) {
          item.subjects.splice(i, 1);
          break;
        }
      }
    });
    students.forEach(async (item) => await item.save());
    return subject;
  } catch (err) {
    console.log(err);
    return null;
  }
};
