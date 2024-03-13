const { Subjects, Departments, EducationPlan, Students } = require("../models");

const updateSubject = async ({
  id,
  name,
  code,
  department,
  level,
  credits,
  semesters,
  gos,
  mandatory,
  special,
  educationPlan,
  aditionalSpecialityName,
}) => {
  try {
    let result;
    const plan = await EducationPlan.findById(educationPlan);
    if (department) {
      dep = await Departments.findById(department);
      if (!plan || plan.level !== level) {
        return null;
      }
      result = await Subjects.findByIdAndUpdate(id, {
        name,
        code,
        department: dep._id,
        level,
        credits,
        semesters,
        gos,
        mandatory,
        special,
        educationPlan: plan._id,
        aditionalSpecialityName,
      });
    } else {
      if (!plan || plan.level !== level) {
        return null;
      }
      result = await Subjects.findByIdAndUpdate(id, {
        name,
        code,
        department: null,
        level,
        credits,
        semesters,
        gos,
        mandatory,
        special,
        educationPlan: plan._id,
      });
    }
    if (!result) {
      return null;
    }
    const students = await Students.find({ educationPlan: plan._id });
    students.forEach(async (student) => {
      for (let i = 0; i < student.subjects.length; i++) {
        if (student.subjects[i]._id.toString() === result._id.toString()) {
          student.subjects.splice(i, 1, result);
          break;
        }
      }
      await student.save();
    });
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = updateSubject;
