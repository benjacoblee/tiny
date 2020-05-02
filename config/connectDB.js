const config = require("config");
const mongoose = require("mongoose");

module.exports = async () => {
  try {
    await mongoose.connect(
      config.get("mongoURI"),
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      },
      () => {
        console.log("Connected to mongoDB");
      }
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
