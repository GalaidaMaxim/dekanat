const createPlanForDepartment = require("./createPlanForDepartment");
const apiMidlvare = require("./apiMidlvare");
const archiveStudentFunction = require("./archiveStudent");
const openFolderSelector = require("./openDialog");
const { isMongouseConnected, connectMongouse } = require("./connectMongouse");
const { encriptPassword, checkPassword } = require("./hashProcess");

module.exports = {
  createPlanForDepartment,
  apiMidlvare,
  openFolderSelector,
  isMongouseConnected,
  connectMongouse,
  encriptPassword,
  archiveStudentFunction,
  checkPassword,
};
