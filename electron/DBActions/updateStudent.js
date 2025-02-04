const { Students, createAction } = require("../models");

module.exports = async (id, info) => {
  try {
    const result = await Students.findByIdAndUpdate(id, info, {
      new: true,
    }).populate("department");
    if (!result) {
      return null;
    }
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
};
