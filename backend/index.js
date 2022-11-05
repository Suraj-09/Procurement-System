const express = require("express");
const mongoose = require("mongoose");

const users = require('./routes/users');
const items = require('./routes/items');
const requests = require('./routes/requests');

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

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

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});