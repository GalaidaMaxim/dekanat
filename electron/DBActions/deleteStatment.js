const { Statment } = require("../models");

module.exports = async ({ id }) => {
  try {
    await Statment.findByIdAndDelete(id);
    return true;
  } catch (err) {
    return false;
  }
};
