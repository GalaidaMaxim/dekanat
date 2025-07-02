const { State } = require("../models");

module.exports = async (value = false) => {
  console.log(value);
  await State.findByIdAndUpdate("68317d4f28ff181842e340eb", {
    openForSelectSubject: value,
  });
  return true;
};
