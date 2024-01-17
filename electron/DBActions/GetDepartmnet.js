const { Departments } = require("../models");

const getDepartments = async ({ id = null }) => {
  try {
    if (!id) {
      const result = await Departments.find();
      return result;
    }
    const result = await Departments.findById(id);
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = getDepartments;
