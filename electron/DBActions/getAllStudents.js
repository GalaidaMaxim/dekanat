const { Students } = require("../modes");

module.exports = async () => {
  try {
    const result = await Students.find().populate("department");
    console.log(result);
    return result;
  } catch (err) {
    return null;
  }
};
