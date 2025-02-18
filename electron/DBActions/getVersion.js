const { Version } = require("../models");

module.exports = async () => {
  try {
    const result = await Version.findById("65b63ef49c1f3fd5092b6a74");
    console.log(result);

    if (!result) {
      return null;
    }
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
};
