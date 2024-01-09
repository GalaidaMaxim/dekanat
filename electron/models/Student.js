const { Schema, model } = require("mongoose");

const StudentSchema = new Schema({
  name: {
    type: String,
    trim: true,
    require: true,
  },
  sername: {
    type: String,
    trim: true,
    require: true,
  },
  secondName: {
    type: String,
    trim: true,
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: "department",
  },
  level: {
    type: String,
    enum: ["бакалавр", "магістр"],
    default: "бакалавр",
  },
  course: {
    type: Number,
    default: 1,
  },
});

module.exports = model("student", StudentSchema);
