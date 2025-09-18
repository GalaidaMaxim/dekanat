const Departments = require("./Department");
const Students = require("./Student");
const EducationPlan = require("./EducationPlan");
const { Subjects } = require("./Subject");
const Version = require("./Verision");
const User = require("./User");
const { Action, createAction } = require("./Action");
const Facultet = require("./Facultets");
const State = require("./State");
const Statment = require("./Statement");
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
  State,
  Statment,
};
