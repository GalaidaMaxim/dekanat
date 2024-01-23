const fs = require("fs");

module.exports = (pathname) => {
  try {
    fs.accessSync(pathname, fs.constants.W_OK);
  } catch (err) {
    console.log(`Createing derectory ${pathname}`);
    fs.mkdirSync(pathname, { recursive: true });
  }
};
