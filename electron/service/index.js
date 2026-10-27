const createPlanForDepartment = require("./createPlanForDepartment");
const apiMidlvare = require("./apiMidlvare");
const archiveStudentFunction = require("./archiveStudent");
const openFolderSelector = require("./openDialog");
const { isMongouseConnected, connectMongouse } = require("./connectMongouse");
const { encriptPassword, checkPassword } = require("./hashProcess");
const openFileDialog = require("./openFileSelector");
const abreviaturizer = require("./abreviaturizer");

module.exports = {
  createPlanForDepartment,
  apiMidlvare,
  openFolderSelector,
  isMongouseConnected,
  connectMongouse,
  encriptPassword,
  archiveStudentFunction,
  checkPassword,
  openFileDialog,
  abreviaturizer,
};
