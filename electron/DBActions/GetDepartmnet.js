const { Departments } = require("../models");

const getDepartments = async () => {
  try {
    const result = await Departments.find();
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = getDepartments;
