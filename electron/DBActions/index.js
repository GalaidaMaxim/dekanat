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
const deleteStudent = require("./deleteStudent");
const getSubejctsByEducationPlan = require("./getSubjectsByEducationPlan");
const deleteEducationPlan = require("./deleteEducationPlan");
const getStudentsByParams = require("./getStudentsByParams");
const deleteSubject = require("./deleteSubject");
const getStudentsByCourse = require("./getStudentByCourse");
const chageDBToNextYear = require("./chageDBToNextYear");
const createUser = require("./createUser");
const loginUser = require("./loginUser");
const logoutUser = require("./logoutUser");
const getAllUsers = require("./getAllUsers");
const editUser = require("./editUser");
const deleteUser = require("./deleteUser");
const getFacultets = require("./getFacultets");
const setOpenForSelect = require("./setOpenSelectSubject");
const archiveStudent = require("./archiveStudent");
const changeSubjectSortNumber = require("./changeSubjectSortNumber");
const changeUserPassword = require("./changeUserPassword");
const getStudentsByEducationPlan = require("./getStudentsByEducationPlan");
const readAchiveStudent = require("./readAchivedStudent");
const archiveYear = require("./archiveYear");

module.exports = {
  deleteStudent,
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
  getSubejctsByEducationPlan,
  deleteEducationPlan,
  getStudentsByParams,
  deleteSubject,
  getStudentsByCourse,
  chageDBToNextYear,
  createUser,
  loginUser,
  logoutUser,
  getAllUsers,
  editUser,
  deleteUser,
  getFacultets,
  setOpenForSelect,
  archiveStudent,
  changeSubjectSortNumber,
  changeUserPassword,
  getStudentsByEducationPlan,
  readAchiveStudent,
  archiveYear,
};
