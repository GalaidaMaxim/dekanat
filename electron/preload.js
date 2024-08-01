const { contextBridge, ipcRenderer } = require("electron");
console.log("presload scripet");

contextBridge.exposeInMainWorld("mainApi", {
  invokeMain: (pipe, data = {}) => ipcRenderer.invoke(pipe, data),
  addListener: (channel, callback) => {
    ipcRenderer.addListener(channel, (event, value) => callback(value));
  },
  removeListener: (channel, callback) => {
    ipcRenderer.removeListener(channel, (event, value) => callback(value));
  },
});
