const mongoose = require("mongoose");
const quotationModel = require("./quotationModel");

const requestSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    organization_name: {
      type: String,
      required: true,
    },
    item_name: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    quotations: {
      type: [quotationModel.schema],
      required: false,
    },
    order: {
      type: quotationModel.schema,
      required: false,
    },
    request_status: {
      type: String,
      enum: ["Sent", "Cancelled", "Pending", "Rejected", "Ordered"],
      required: true,
    },
  },
  { timestamps: true }
);

const requestModel = mongoose.model("request", requestSchema);
module.exports = requestModel;
