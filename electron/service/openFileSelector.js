const { dialog } = require("electron");

function openFileDialog(mainWindow) {
  return async () => {
    try {
      let result = await dialog.showOpenDialog(mainWindow, {
        properties: ["openFile"],
      });

      if (!result.canceled) {
        result = result.filePaths[0];
      } else {
        result = null;
      }
      return JSON.stringify(result);
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = openFileDialog;
