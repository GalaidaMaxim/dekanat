const { Menu, MenuItem } = require("electron");
const logoutUser = require("../DBActions/logoutUser");

const createAppMenu = () => {
  const menu = Menu.buildFromTemplate([
    new MenuItem({
      label: "Користувач",
      submenu: [
        new MenuItem({
          label: "Налаштування",
          enabled: process.userId ? true : false,
        }),
        new MenuItem({
          label: "Вийти",
          enabled: process.userId ? true : false,
          click: () => {
            logoutUser();
            process.mainWindow.webContents.send("logoutUser");
            createAppMenu();
          },
        }),
      ],
    }),
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

module.exports = createAppMenu;
