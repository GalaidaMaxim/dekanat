const { updateSubject } = require("../DBActions");

module.exports = async (event, data) => {
  const result = await updateSubject(data);
  return JSON.stringify(result);
};
