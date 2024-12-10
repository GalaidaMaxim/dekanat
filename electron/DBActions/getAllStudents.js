const { Students } = require("../models");

module.exports = async ({ params = {}, page = 1 }) => {
  try {
    console.log(params);

    const limit = 6;
    const totalStudents = await Students.countDocuments(params);
    const result = await Students.find(params)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("department");
    return { studentsArr: result, limit, totalStudents };
  } catch (err) {
    return null;
  }
};
