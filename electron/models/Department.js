const { Schema, model } = require("mongoose");

const Department = new Schema({
  name: {
    type: Schema.Types.String,
  },
  level: {
    type: Schema.Types.String,
  },
});

module.exports = model("department", Department);
