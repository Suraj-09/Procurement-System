const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    user_type: {
      type: String,
      enum: ["employee", "supervisor"],
      default: "employee",
      required: true,
    },
    organization_name: {
      type: String,
      required: true,
    },
  }
);

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
