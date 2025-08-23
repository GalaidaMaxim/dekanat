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
    let subjects = await Subjects.find({ educationPlan });

    subjects = subjects.filter(
      (item) => item.code.charAt(0) === code.charAt(0)
    );
    const lastNumber = subjects.reduce(
      (acc, item) => (item.sortNumber > acc ? item.sortNumber : acc),
      1
    );

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
        sortNumber: lastNumber + 1,
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
        sortNumber: lastNumber + 1,
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
