const { Students } = require("../models");

module.exports = async (id, info) => {
  try {
    const result = await Students.findByIdAndUpdate(id, info);
    if (!result) {
      return null;
    }
    return reuslt;
  } catch (err) {
    console.log(err);
    return null;
  }
};
