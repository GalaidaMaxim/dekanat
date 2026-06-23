const { Statment } = require("../models");

module.exports = async ({ id, info }) => {
  try {
    console.log(id, info);

    const result = await Statment.findByIdAndUpdate(id, info, {
      new: true,
    })
      .populate("educationPlan")
      .populate("facultet")
      .populate("department")
      .populate("subject")
      .populate({
        path: "users", // массив ObjectId
        select: "name sername secondName", // только эти поля
      });
    if (!result) {
      return null;
    }
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
};
