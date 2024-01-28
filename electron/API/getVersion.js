const { getVersion } = require("../DBActions");

module.exports = async (event) => {
  const result = await getVersion();
  return JSON.stringify(result);
};
