const router = require("express").Router();

const requestModel = require("../models/requestModel");

// getAllRequests()
router.route("/").get(async (req, res) => {
  try {
    const requests = await requestModel.find();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// getRequest(String id)
router.route("/:id").get(async (req, res) => {
  try {
    const request = await requestModel.find({ _id: req.params.id });
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// getRequestByUserId(String user_id)
router.route("/user/:user_id").get(async (req, res) => {
  try {
    const request = await requestModel.find({ user_id: req.params.user_id });
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// getRequestByOrgName(String org_name)
router.route("/org_name/:org_name").get(async (req, res) => {
  try {
    const request = await requestModel.find({ organization_name: req.params.org_name });
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// setRequest(String id, Request request)
router.route("/update/:id").patch(async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };
    const request = await requestModel.findByIdAndUpdate(
      id,
      updatedData,
      options
    );

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// addRequest(Request request)
router.route("/add").post(async (req, res) => {
  const user_id = req.body.user_id;
  const organization_name = req.body.organization_name;
  const item_name = req.body.item_name;
  const quantity = req.body.quantity;
  const quotations = null;
  const order = null;
  const request_status = "Sent";

  const newRequest = new requestModel({
    user_id,
    organization_name,
    item_name,
    quantity,
    quotations,
    order,
    request_status,
  });

  try {
    const dataToSave = await newRequest.save();
    res.status(200).json(newRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
