const getDepartments = require("./getDepartments");
const createStudent = require("./createStudent");
const getStudentByDepartment = require("./getStudentByDepartment");
const getAllStudents = require("./getAllStudents");
const getStudentById = require("./getStudentById");
const createSubject = require("./createSubject");
const getSubjecByDepartment = require("./getSubjectByDepartment");
const addMandatorySubjects = require("./addMandatorySubjects");
const updateStudent = require("./updateStudent");
module.exports = {
  getDepartments,
  createStudent,
  getStudentByDepartment,
  getAllStudents,
  getStudentById,
  createSubject,
  getSubjecByDepartment,
  addMandatorySubjects,
  updateStudent,
};
