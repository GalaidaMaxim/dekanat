const { Schema, model } = require("mongoose");

const semester = new Schema({
  include: {
    type: Boolean,
    require: true,
  },
  assessmentType: {
    type: Number,
    enum: [1, 2, 3, 4],
    require: true,
  },
  mark: {
    type: Schema.Types.Mixed,
  },
  reDelivery: {
    type: Boolean,
    default: false,
  },
  ignore: {
    type: Boolean,
    default: false,
  },
  chageDate: {
    type: Number,
    default: null,
  },
  lastChanger: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

const SubjectSchema = new Schema({
  name: {
    type: String,
    trim: true,
    require: true,
  },
  code: {
    type: String,
    require: true,
  },
  internalCode: {
    type: String,
  },
  educationPlan: {
    type: Schema.Types.ObjectId,
    ref: "educationPlan",
  },
  department: {
    type: Schema.Types.ObjectId || null,
    ref: "department",
    default: null,
  },
  level: {
    type: String,
    enum: ["бакалавр", "магістр", "молодший бакалавр"],
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
  aditionalSpecialityName: {
    type: String,
    default: "",
  },
});

module.exports = {
  Subjects: model("Subject", SubjectSchema),
  SubjectSchema,
};
