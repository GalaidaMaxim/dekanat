const { Menu, MenuItem } = require("electron");

module.exports = () => {
  const menu = Menu.buildFromTemplate([
    new MenuItem({ label: "Користувач" }),
    new MenuItem({
      label: "Налаштування",
      submenu: [
        new MenuItem({
          label: "Налаштувати підключення",
          click: () => {
            process.mainWindow.webContents.send("openMongouseSetup");
          },
        }),
      ],
    }),
    new MenuItem({ label: "Перегляд", role: "viewMenu" }),
  ]);
  Menu.setApplicationMenu(menu);
};
