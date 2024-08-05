const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  sername: {
    type: String,
    require: true,
  },
  login: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  premissions: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

module.exports = model("user", UserSchema);
