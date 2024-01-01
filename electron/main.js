const { app, BrowserWindow, ipcMain } = require("electron");
const mongoose = require("mongoose");
const { getDepartments } = require("./DBActions");
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
};

app.whenReady().then(() => {
  createWindow();
  mongoose.set("strictQuery", false);
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
  ipcMain.handle("getDeparments", async () => {
    const res = await getDepartments();
    return res;
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
