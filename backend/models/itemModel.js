const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
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
  price: {
    type: Number,
    required: true,
  },
});

const itemModel = mongoose.model("item", itemSchema);
module.exports = itemModel;
