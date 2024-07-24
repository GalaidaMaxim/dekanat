const { Students } = require("../models");

module.exports = async () => {
  try {
    const result = await Students.find({ status: "навчається" }).populate(
      "department"
    );
    return result;
  } catch (err) {
    return null;
  }
};
