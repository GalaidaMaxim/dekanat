const { Schema, model } = require("mongoose");

const semester = new Schema({
  include: {
    type: Boolean,
    require: true,
  },
  assessmentType: {
    type: Number,
    enum: [1, 2, 3],
    require: true,
  },
});

const SubjectSchema = new Schema({
  name: {
    type: String,
    trim: true,
    require: true,
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
  credits: {
    type: Number,
    require: true,
  },
  semesters: {
    type: [semester],
  },
  gos: {
    type: Boolean,
    require: true,
  },
  mandatory: {
    type: Boolean,
    require: true,
  },
  special: {
    type: Boolean,
    require: true,
  },
  coach: {
    type: String,
    default: "",
  },
});

module.exports = {
  Subjects: model("Subject", SubjectSchema),
  SubjectSchema,
};
