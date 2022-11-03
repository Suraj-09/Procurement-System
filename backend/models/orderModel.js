const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
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
    supplier_name: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    total_cost: {
      type: Number,
      required: true,
    },
    order_status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const orderModel = mongoose.model("order", orderSchema);
module.exports = orderModel;
