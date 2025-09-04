const { Students, Departments } = require("../models");
const fs = require("fs/promises");
const path = require("path");

module.exports = async ({ pathFolder, year, remove = false }) => {
  const students = await Students.find({
    startYear: year,
    status: "випустився",
  }).populate("department");
  console.log(students);
  return true;
};
