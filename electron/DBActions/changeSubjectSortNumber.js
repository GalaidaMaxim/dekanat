const { Subjects } = require("../models");

module.exports = async ({ s1ID, s2ID }) => {
  const s1 = await Subjects.findById(s1ID);
  const s2 = await Subjects.findById(s2ID);

  const v = s1.sortNumber;
  s1.sortNumber = s2.sortNumber;
  s2.sortNumber = v;
  await s1.save();
  await s2.save();

  return [s1, s2];
};
