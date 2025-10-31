const { Statment } = require("../models");
module.exports = async ({ params = {}, page = 1, limit = 30 }) => {
  try {
    console.log(params);

    const count = await Statment.countDocuments({ params });
    const statments = await Statment.find(params)
      .populate("educationPlan")
      .populate("facultet")
      .populate("department")
      .populate("subject")
      .populate({
        path: "users", // массив ObjectId
        select: "name sername", // только эти поля
      })
      .sort({
        code: 1,
      })
      .skip((page - 1) * limit)
      .limit(limit);
    return {
      pages: Math.ceil(count / limit),
      statments,
    };
  } catch (err) {
    console.log(err);

    return false;
  }
};
