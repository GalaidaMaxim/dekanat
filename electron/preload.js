const { contextBridge, ipcRenderer } = require("electron");
console.log("presload scripet");

contextBridge.exposeInMainWorld("mainApi", {
  getDepartments: () => ipcRenderer.invoke("getDeparments"),
});
