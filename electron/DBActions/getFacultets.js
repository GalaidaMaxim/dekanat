const { Facultet } = require("../models");

module.exports = async () => {
  const facultet = await Facultet.find();
  return facultet;
};
