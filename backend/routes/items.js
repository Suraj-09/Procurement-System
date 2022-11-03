const router = require("express").Router();

const itemModel = require("../models/itemModel");

router.route("/").get(async (req, res) => {
  try {
    const items = await itemModel.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.route("/:item_name").get(async (req, res) => {
  try {
    const items = await itemModel.find({item_name:req.params.item_name});
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.route("/add").post(async (req, res) => {
  const item_name = req.body.item_name;
  const supplier_name = req.body.supplier_name;
  const price = req.body.price;

  const newItem = new itemModel({
    item_name,
    supplier_name,
    price,
  });

  try {
    const dataToSave = await newItem.save();
    res.status(200).json("Item added!");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;