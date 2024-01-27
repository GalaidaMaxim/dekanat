const { Subjects } = require("../models");

module.exports = async ({ id }) => {
  try {
    const subject = await Subjects.findById(id);
    if (!subject) {
      return null;
    }
    return subject;
  } catch (err) {
    console.log(err);
    return null;
  }
};
