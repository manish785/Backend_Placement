const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      //required: true,
    },
    email: {
      type: String,
      //required: true,
      unique: true,
    },
    password: {
      type: String,
      //required: true,
    },
  },
  {
    timestamps: true,
  }
);

// validate the password with passed on user password


const User = new mongoose.model("User", userSchema);

module.exports = User;