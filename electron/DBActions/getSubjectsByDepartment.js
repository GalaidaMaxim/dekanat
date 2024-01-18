const { Subjects } = require("../models");

module.exports = async ({ department, level }) => {
  try {
    const changable = await Subjects.find({
      department,
      level,
      mandatory: false,
    });
    const mandatory = await Subjects.find({ level, mandatory: true });
    if (!changable || !mandatory) {
      return null;
    }
    return [...mandatory, ...changable];
  } catch (err) {
    console.log(err);
    return null;
  }
};
