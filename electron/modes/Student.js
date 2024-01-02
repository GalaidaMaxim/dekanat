const { Schema, model } = require("mongoose");

const StudentSchema = new Schema({
  name: Schema.Types.String,
  sername: Schema.Types.String,
  secondName: Schema.Types.String,
  department: Schema.Types.ObjectId,
});

module.exports = model("students", StudentSchema);
