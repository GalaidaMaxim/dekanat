const { contextBridge, ipcRenderer } = require("electron");
console.log("presload scripet");

contextBridge.exposeInMainWorld("mainApi", {
  invokeMain: (pipe, data = {}) => ipcRenderer.invoke(pipe, data),
});
