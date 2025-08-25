const { Subjects } = require("../models");

module.exports = async ({ planID, subjectID, up = true }) => {
  let subjects = await Subjects.find({ educationPlan: planID });
  const mainSubject = subjects.find((item) => item._id === subjectID);
  subjects = subjects
    .filter((item) => item.code.charAt(0) === mainSubject.code.charAt(0))
    .sort((a, b) => a.sortNumber - b.sortNumber);

  const mainIndex = subjects.findIndex((item) => item._id === subjectID);

  if (up && mainIndex + 1 !== subjects.length) {
    const value = mainSubject.sortNumber;
    mainSubject.sortNumber = subjects[mainIndex + 1].sortNumber;
    subjects[mainIndex + 1].sortNumber = value;
    await subjects[mainIndex + 1].save();
    await mainSubject.save();
  } else if (!up && mainIndex !== 0) {
    const value = mainSubject.sortNumber;
    mainSubject.sortNumber = subjects[mainIndex - 1].sortNumber;
    subjects[mainIndex - 1].sortNumber = value;
    await subjects[mainIndex - 1].save();
    await mainSubject.save();
  }

  return mainSubject;
};
