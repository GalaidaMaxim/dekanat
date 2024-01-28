const { app, BrowserWindow, ipcMain } = require("electron");
const mongoose = require("mongoose");
const {
  getDepartments,
  createStudent,
  getStudentByDepartment,
  getAllStudents,
  getStudentById,
  updateSubject,
  createSubject,
  getSubjecByDepartment,
  addMandatorySubjects,
  updateStudent,
  createColedgeMarkTable,
  createEducationPlan,
  getEducationPlan,
  getSubjectByID,
  getVersion,
} = require("./API");
const path = require("path");

console.log(path.join(__dirname, "preload.js"));

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadURL("http://localhost:3000");
  mainWindow.maximize();
  mainWindow;
};

app.whenReady().then(() => {
  createWindow();
  mongoose.set("strictQuery", true);
  mongoose
    .connect(
      "mongodb+srv://User:53435343@cluster0.amztsfk.mongodb.net/Gliera?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log("MongouseConnected");
    })
    .catch((err) => {
      console.log(err);
    });
  ipcMain.handle("getDeparments", getDepartments);
  ipcMain.handle("createStudent", createStudent);
  ipcMain.handle("getStudentByDepartment", getStudentByDepartment);
  ipcMain.handle("getAllStudents", getAllStudents);
  ipcMain.handle("getStudentById", getStudentById);
  ipcMain.handle("createSubject", createSubject);
  ipcMain.handle("getSubjecByDepartment", getSubjecByDepartment);
  ipcMain.handle("addMandatorySubjects", addMandatorySubjects);
  ipcMain.handle("updateStudent", updateStudent);
  ipcMain.handle("createColedgeMarkTable", createColedgeMarkTable);
  ipcMain.handle("createEducationPlan", createEducationPlan);
  ipcMain.handle("getEducationPlan", getEducationPlan);
  ipcMain.handle("getSubjectByID", getSubjectByID);
  ipcMain.handle("updateSubject", updateSubject);
  ipcMain.handle("getVersion", getVersion);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
