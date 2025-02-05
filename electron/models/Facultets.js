const { Schema, model } = require("mongoose");

const Facultet = {
  name: String,
};

module.exports = model("facultet", Facultet);
