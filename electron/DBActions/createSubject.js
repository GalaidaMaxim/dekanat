const { Subjects, Departments, EducationPlan } = require("../models");

const createSubject = async ({
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
}) => {
  try {
    const dep = await Departments.findById(department);
    const plan = await EducationPlan.findById(educationPlan);
    if (!plan || plan.level !== level) {
      return null;
    }
    const result = await Subjects.create({
      name,
      code,
      department: dep._id !== "Всі" ? dep._id : null,
      level,
      credits,
      semesters,
      gos,
      mandatory,
      special,
      educationPlan: plan._id,
    });
    if (!result) {
      return null;
    }
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = createSubject;
