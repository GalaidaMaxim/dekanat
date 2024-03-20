const { Schema, model } = require("mongoose");

const Department = new Schema({
  name: {
    type: Schema.Types.String,
  },
  level: {
    type: Schema.Types.String,
  },
  fullName: {
    type: Schema.Types.String,
    default: "",
  },
});

module.exports = model("department", Department);
