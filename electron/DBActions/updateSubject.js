const { Subjects, Departments, EducationPlan } = require("../models");

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
    if (department) {
      dep = await Departments.findById(department);
      const plan = await EducationPlan.findById(educationPlan);
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
      const plan = await EducationPlan.findById(educationPlan);
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
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = updateSubject;
