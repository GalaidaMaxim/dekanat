const { EducationPlan, Subjects } = require("../models");

module.exports = async ({ name, level, copyPlan = null }) => {
  try {
    const result = await EducationPlan.create({ name, level });
    if (!result) {
      return null;
    }
    if (!copyPlan) {
      return result;
    }
    const copySubjects = await Subjects.find({ educationPlan: copyPlan });
    for (let i = 0; i < copySubjects.length; i++) {
      const {
        name,
        code,
        department,
        credits,
        semesters,
        gos,
        mandatory,
        special,
        coach,
        aditionalSpecialityName,
      } = copySubjects[i];
      const res = await Subjects.create({
        name,
        code,
        department,
        credits,
        semesters,
        gos,
        mandatory,
        special,
        coach,
        aditionalSpecialityName,
        level,
        educationPlan: result._id,
      });
      if (!res) {
        throw { message: "copy error" };
      }
    }
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
};
