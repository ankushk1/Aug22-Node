const mongoose = require("mongoose");
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;

db.on("error", (err) => {
  console.log("Error connecting to DB", err);
});

db.once("open", () => {
  console.log("Successfully connected to DB");
});
