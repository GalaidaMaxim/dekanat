const { app, BrowserWindow, ipcMain } = require("electron");
const { mongoose } = require("mongoose");

const {
  apiMidlvare,
  openFolderSelector,
  connectMongouse,
  isMongouseConnected,
} = require("./service");
const createStatment = require("./docDocumtns/createStatement");
const { createAppMenu } = require("./AppMenu");
const {
  checkFileExisting,
  createEmptyFile,
  setMongouseConnectionData,
} = require("./setupFile");
const {
  getDepartments,
  createStudent,
  getStudentByDepartment,
  getStudentById,
  updateSubject,
  createSubject,
  getSubjecByDepartment,
  addMandatorySubjects,
  updateStudent,
  createEducationPlan,
  getEducationPlan,
  getSubjectByID,
  getVersion,
} = require("./API");

const {
  deleteStudent,
  deleteEducationPlan,
  getStudentsByParams,
  deleteSubject,
  getSubejctsByEducationPlan,
  getStudentsByCourse,
  createUser,
  loginUser,
  getAllUsers,
  logoutUser,
  editUser,
  chageDBToNextYear,
  getAllStudents,
  getFacultets,
} = require("./DBActions");

const createSummaryReportTable = require("./exelTables/summaryReport");
const createFlexSubjectTable = require("./exelTables/createFlexSubjectReport");
const createTotalMarksTable = require("./exelTables/createTotalMarksTable");
const path = require("path");

console.log(path.join(__dirname, "preload.js"));
let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,

    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    // icon: path.resolve(__dirname, "icon.ico"),
  });

  mainWindow.loadURL("http://localhost:3000");
  // mainWindow.loadFile("../aplication/build/index.html");
  mainWindow.maximize();
  process.mainWindow = mainWindow;
  return mainWindow;
};

app.whenReady().then(async () => {
  createWindow();
  createAppMenu();
  if (!(await checkFileExisting())) {
    await createEmptyFile();
  }

  ipcMain.handle("getDeparments", getDepartments);
  ipcMain.handle("createStudent", createStudent);
  ipcMain.handle("getStudentByDepartment", getStudentByDepartment);
  ipcMain.handle("getAllStudents", apiMidlvare(getAllStudents));
  ipcMain.handle("getStudentById", getStudentById);
  ipcMain.handle("createSubject", createSubject);
  ipcMain.handle("getSubjecByDepartment", getSubjecByDepartment);
  ipcMain.handle("addMandatorySubjects", addMandatorySubjects);
  ipcMain.handle("updateStudent", updateStudent);
  ipcMain.handle("createEducationPlan", createEducationPlan);
  ipcMain.handle("getEducationPlan", getEducationPlan);
  ipcMain.handle("getSubjectByID", getSubjectByID);
  ipcMain.handle("updateSubject", updateSubject);
  ipcMain.handle("getVersion", getVersion);
  ipcMain.handle("deleteStudent", apiMidlvare(deleteStudent));
  ipcMain.handle("deleteEducationPlan", apiMidlvare(deleteEducationPlan));
  ipcMain.handle("getStudentsByParams", apiMidlvare(getStudentsByParams));
  ipcMain.handle("getFacultets", apiMidlvare(getFacultets));
  ipcMain.handle("deleteSubject", apiMidlvare(deleteSubject));
  ipcMain.handle("createStatment", createStatment);
  ipcMain.handle("selectFolder", openFolderSelector(mainWindow));
  ipcMain.handle(
    "createSummaryReportTable",
    apiMidlvare(createSummaryReportTable)
  );
  ipcMain.handle("createTotalMarksTable", apiMidlvare(createTotalMarksTable));
  ipcMain.handle(
    "getSubjectsByEducationPlan",
    apiMidlvare(getSubejctsByEducationPlan)
  );
  ipcMain.handle("getStudentsByCourse", apiMidlvare(getStudentsByCourse));
  ipcMain.handle("createFlexSubjectTable", apiMidlvare(createFlexSubjectTable));
  ipcMain.handle("chageDBToNextYear", apiMidlvare(chageDBToNextYear));
  ipcMain.handle(
    "setMongouseConnectionData",
    apiMidlvare(setMongouseConnectionData)
  );
  ipcMain.handle("connectMongouse", apiMidlvare(connectMongouse));
  ipcMain.handle("isMongouseConnected", apiMidlvare(isMongouseConnected));
  ipcMain.handle("createUser", apiMidlvare(createUser));
  ipcMain.handle("loginUser", apiMidlvare(loginUser));
  ipcMain.handle("getAllUsers", apiMidlvare(getAllUsers));
  ipcMain.handle("editUser", apiMidlvare(editUser));
});

app.on("window-all-closed", async () => {
  await logoutUser();
  await mongoose.disconnect();
  if (process.platform !== "darwin") app.quit();
});
