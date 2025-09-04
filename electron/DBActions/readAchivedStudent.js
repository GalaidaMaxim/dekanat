const fs = require("fs/promises");

module.exports = async ({ path }) => {
  const student = (await fs.readFile(path)).toString("utf-8");
  return JSON.parse(student);
};
