const fs = require("fs/promises");
const path = require("path");

const setupFilePath = path.resolve("./setup.json");

const checkFileExisting = async () => {
  try {
    await fs.access(setupFilePath);
    return true;
  } catch (err) {
    return false;
  }
};

const createEmptyFile = async () => {
  const data = JSON.stringify({
    mongouseUser: "",
    mongousePassword: "",
    userName: "",
  });
  await fs.writeFile(setupFilePath, data);
};

const setMongouseConnectionData = async ({
  mongouseUser,
  mongousePassword,
}) => {
  let fileData = {};
  if (await checkFileExisting()) {
    fileData = (await fs.readFile(setupFilePath)).toString("utf-8");
    fileData = JSON.parse(fileData);
  }
  fileData.mongouseUser = mongouseUser;
  fileData.mongousePassword = mongousePassword;
  await fs.writeFile(setupFilePath, JSON.stringify(fileData));
};

const getMongouseData = async () => {
  if (!(await checkFileExisting())) {
    return null;
  }
  let fileData = (await fs.readFile(setupFilePath)).toString("utf-8");
  fileData = JSON.parse(fileData);
  if (!fileData.mongouseUser || !fileData.mongousePassword) {
    return null;
  }
  return {
    user: fileData.mongouseUser,
    password: fileData.mongousePassword,
  };
};

module.exports = {
  checkFileExisting,
  createEmptyFile,
  setMongouseConnectionData,
  getMongouseData,
};
