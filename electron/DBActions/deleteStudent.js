const { Students, createAction } = require("../models");

module.exports = async ({ id }) => {
  try {
    const result = await Students.findByIdAndDelete(id);
    if (!result) {
      return null;
    }
    await createAction({
      info: JSON.stringify({ id }),
      type: "deleteStudent",
    });
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
};
