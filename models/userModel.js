const mongoose = require("mongoose");

//Schema
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: [true, "Username is required"] },
    email: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    password: { type: String, required: [true, "Password is required"] },
    address: { type: Array },
    phone: { type: String, required: [true, "Phone number is required"] },
    userType: {
      type: String,
      required: [true, "User type is required"],
      default: "client",
      enum: ["client", "admin", "vendor", "driver"],
    },
    profile: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
