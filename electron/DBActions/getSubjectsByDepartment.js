const { Subjects } = require("../models");

module.exports = async ({ department, level }) => {
  try {
    const result = await Subjects.find({ department, level });
    if (!result) {
      return null;
    }
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
};
