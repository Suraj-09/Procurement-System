const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    sender_email: {
      type: String,
      required: true,
    },
    receiver_email: {
      type: String,
      required: true,
    },
    organization_name: {
      type: String,
      required: true,
    },
    request_id: {
      type: String,
    },
    message: {
      type: String,
      required: true,
    },
    read_status: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const notificationModel = mongoose.model("notification", notificationSchema);
module.exports = notificationModel;
