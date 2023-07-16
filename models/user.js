const mongoose = require("mongoose");

// Note -> // Because of bootstrap or any other library element, 
          // they already have validators. So, we can remove validators from userSchema.
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