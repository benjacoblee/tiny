const express = require("express");
const app = express();
const config = require("config");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

mongoose.connect(
  config.get("mongoURI"),
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => {
    console.log("Connected to mongoDB");
  }
);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
