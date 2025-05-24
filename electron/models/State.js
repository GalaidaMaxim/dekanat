const { Schema, model } = require("mongoose");

const StateSchema = new Schema({
  openForSelectSubject: Boolean,
});

module.exports = model("state", StateSchema);
