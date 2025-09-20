const { Statment } = require("../models");
module.exports = async ({ params = {} }) => {
  const statment = await Statment.countDocuments(params);
};
