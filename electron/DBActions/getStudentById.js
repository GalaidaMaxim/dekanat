const { Students } = require("../models");

module.exports = async (id) => {
  try {
    const student = await Students.findById(id).populate("department");
    if (!student) {
      return null;
    }
    return student;
  } catch (err) {
    console.log(err);
    return null;
  }
};
