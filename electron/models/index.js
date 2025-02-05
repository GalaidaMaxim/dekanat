const Departments = require("./Department");
const Students = require("./Student");
const EducationPlan = require("./EducationPlan");
const { Subjects } = require("./Subject");
const Version = require("./Verision");
const User = require("./User");
const { Action, createAction } = require("./Action");
const Facultet = require("./Facultets");

module.exports = {
  Departments,
  Students,
  Subjects,
  EducationPlan,
  Version,
  User,
  Action,
  createAction,
  Facultet,
};
