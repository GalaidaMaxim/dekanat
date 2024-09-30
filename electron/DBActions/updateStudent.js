const { Students, createAction } = require("../models");

module.exports = async (id, info) => {
  try {
    const result = await Students.findByIdAndUpdate(id, info, {
      new: true,
    }).populate("department");
    if (!result) {
      return null;
    }

    await createAction({
      info: JSON.stringify({ id, info }),
      type: "updateStudent",
    });
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
};
