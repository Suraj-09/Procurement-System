const mongoose = require("mongoose");

const quotationSchema = new mongoose.Schema(
  {
    supplier_name: {
      type: String,
      required: true,
      trim: true,
    },
    total_cost: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const quotationModel = mongoose.model("quotation", quotationSchema);
module.exports = quotationModel;
