const { Statment } = require("../models");

module.exports = async ({ data }) => {
  try {
    const statment = await Statment.create(data);
    if (!statement) {
      return false;
    }
    return statment;
  } catch (err) {
    return false;
  }
};
