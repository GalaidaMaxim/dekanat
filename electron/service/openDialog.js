const { dialog } = require("electron");

function openFolderDialog(mainWindow) {
  return async () => {
    try {
      let result = await dialog.showOpenDialog(mainWindow, {
        properties: ["openDirectory"],
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

module.exports = openFolderDialog;
