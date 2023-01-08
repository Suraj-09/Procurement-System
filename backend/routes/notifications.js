const router = require("express").Router();

const notificationModel = require("../models/notificationModel");

// getAllNotifications()
router.route("/").get(async (req, res) => {
  try {
    const notifications = await notificationModel.find();
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// getNotification(String email)
router.route("/:receiver_email").get(async (req, res) => {
  try {
    const messages = await notificationModel.find({
      receiver_email: req.params.receiver_email,
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// setAllNotificationsToRead(String email)
router.route("/update/read/:receiver_email").patch(async (req, res) => {
  try {
    const notification = await notificationModel.updateMany(
      { receiver_email: req.params.receiver_email },
      { $set: { read_status: true } }
    );

    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// addNotificatione(Notification notification)
router.route("/add").post(async (req, res) => {
  const sender_email = req.body.sender_email;
  const receiver_email = req.body.receiver_email;
  const organization_name = req.body.organization_name;
  const request_id = req.body.request_id;
  const message = req.body.message;
  const read_status = req.body.read_status;

  const newNotification = new notificationModel({
    sender_email,
    receiver_email,
    organization_name,
    request_id,
    message,
    read_status,
  });

  try {
    const dataToSave = await newNotification.save();
    res.status(200).json(newNotification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
