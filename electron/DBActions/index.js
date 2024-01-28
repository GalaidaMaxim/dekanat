const getDepartments = require("./GetDepartmnet");
const createStudent = require("./createStudent");
const getStudentByDepartmant = require("./getStudentsByDepartment");
const getAllStudents = require("./getAllStudents");
const getStudentById = require("./getStudentById");
const createSubjecet = require("./createSubject");
const getSubjectByDepartmant = require("./getSubjectsByDepartment");
const addMandatorySubjects = require("./addMandatorySubjects");
const updateStudent = require("./updateStudent");
const addSubjectToStudent = require("./addSubjectToStudent");
const createEducationPlan = require("./createEducationPlan");
const getEducationPlan = require("./getEducationPlanes");
const getSubjectByID = require("./getSubjectByID");
const updateSubject = require("./updateSubject");
const getVersion = require("./getVersion");

module.exports = {
  getDepartments,
  createStudent,
  getStudentByDepartmant,
  getAllStudents,
  getStudentById,
  createSubjecet,
  createEducationPlan,
  getVersion,
  getSubjectByDepartmant,
  addMandatorySubjects,
  updateStudent,
  addSubjectToStudent,
  getEducationPlan,
  getSubjectByID,
  updateSubject,
};
