const { Schema, model } = require("mongoose");

const EducationPlan = new Schema({
  name: {
    type: String,
    require: true,
  },
  level: {
    type: String,
    enum: ["бакалавр", "магістр", "молодший бакалавр"],
    default: "бакалавр",
  },
});

module.exports = model("educationPlan", EducationPlan);
