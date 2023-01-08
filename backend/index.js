const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const users = require("./routes/users");
const items = require("./routes/items");
const requests = require("./routes/requests");
const notifications = require("./routes/notifications");

require("dotenv").config();
mongoose.set('strictQuery', true);

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: "http://127.0.0.1:5500" }));
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use("/api/users", users);
app.use("/api/items", items);
app.use("/api/requests", requests);
app.use("/api/notifications", notifications);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
