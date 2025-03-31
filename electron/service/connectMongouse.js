const mongoose = require("mongoose");
const { getMongouseData } = require("../setupFile");
const affterConnection = require("./affterConnection");

const isMongouseConnected = () => {
  return { connectionState: mongoose.connection.readyState };
};

const connectMongouse = async () => {
  const data = await getMongouseData();
  if (isMongouseConnected()) {
    await mongoose.disconnect();
  }
  return new Promise((resolve, reject) => {
    if (!data) {
      resolve(false);
    }

    mongoose.set("strictQuery", true);
    mongoose
      .connect(
        `mongodb+srv://${data.user}:${data.password}@cluster0.amztsfk.mongodb.net/Gliera?retryWrites=true&w=majority`
      )
      .then(async () => {
        console.log("MongouseConnected");
        await affterConnection();
        resolve(true);
      })
      .catch((err) => {
        console.log(err);
        reject(false);
      });
  });
};

module.exports = {
  isMongouseConnected,
  connectMongouse,
};
