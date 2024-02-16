const { Students } = require("../models");

module.exports = async ({ id }) => {
  try {
    const result = await Students.findByIdAndDelete(id);
    if (!result) {
      return null;
    }
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
};
