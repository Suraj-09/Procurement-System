const router = require("express").Router();

const userModel = require("../models/userModel");

router.route("/").get(async (req, res) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.route("/:id").get(async (req, res) => {
  try {
    const user = await userModel.find({_id:req.params.id});
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.route("/email/:email").get(async (req, res) => {
  try {
    const user = await userModel.find({email:req.params.email});
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.route("/supervisor/:organization_name").get(async (req, res) => {
  try {
    const user = await userModel.find({organization_name:req.params.organization_name, user_type:"supervisor"});
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.route("/add").post(async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const user_type = req.body.user_type;
  const organization_name = req.body.organization_name;

  const newUser = new userModel({
    name,
    email,
    password,
    user_type,
    organization_name,
  });

  try {
    const dataToSave = await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;