const { Schema, model } = require("mongoose");

const VersionSchema = new Schema({
  current: {
    type: String,
    require: true,
  },
});

module.exports = model("version", VersionSchema);
