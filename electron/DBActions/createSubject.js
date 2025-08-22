const { Subjects, Departments, EducationPlan, Students } = require("../models");

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
  aditionalSpecialityName,
  internalCode,
}) => {
  try {
    let result;
    const plan = await EducationPlan.findById(educationPlan);
    console.log(internalCode);

    if (department) {
      dep = await Departments.findById(department);
      if (!plan || plan.level !== level) {
        return null;
      }
      result = await Subjects.create({
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
        internalCode,
      });
    } else {
      if (!plan || plan.level !== level) {
        return null;
      }
      result = await Subjects.create({
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
        aditionalSpecialityName,
        internalCode,
      });
    }
    if (!result) {
      return null;
    }
    if (result.mandatory) {
      const students = await Students.find({ educationPlan: plan._id });
      students.forEach((item) => item.subjects.push(result));
      students.forEach(async (item) => await item.save());
    }

    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = createSubject;
