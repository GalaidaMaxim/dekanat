const { Students } = require("../models");

module.exports = async ({ depID }) => {
  try {
    const result = await Students.find({
      department: depID,
      status: "навчається",
    });
    return result;
  } catch (err) {
    return null;
  }
};
