const {  } = require("../models");
const

module.exports = async () => {
  try {
    const result = await Version.findById("65b63ef49c1f3fd5092b6a74");
    if (!result) {
      return null;
    }
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
};
