const { Schema, model } = require("mongoose");

const StatmentSchema = new Schema({
  department: {
    type: Schema.Types.ObjectId,
    ref: "department",
    require: true,
  },
  educationPlan: {
    type: Schema.Types.ObjectId,
    ref: "educationPlan",
  },
  course: {
    type: Number,
    trim: true,
    require: true,
  },
  semester: {
    type: Number,
    trim: true,
    require: true,
  },
  subject: {
    type: Schema.Types.ObjectId,
    ref: "subject",
    require: true,
  },
  facultet: {
    type: Schema.Types.ObjectId,
    ref: "facultet",
    require: true,
  },
  remoteType: {
    type: String,
    trim: true,
    require: true,
  },
  code: {
    type: String,
    trim: true,
    require: true,
  },
  year: {
    type: String,
    trim: true,
    require: true,
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
  ],
  decan: {
    type: String,
    trim: true,
    require: true,
  },
  group: {
    type: String,
    default: "А",
    enum: ["А", "Б", "В", "Г", "Д"],
  },
  foreigner: {
    type: Boolean,
  },
});

module.exports = model("statment", StatmentSchema);
