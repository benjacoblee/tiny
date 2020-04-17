const express = require("express");
const app = express();
const connectDB = require("./config/connectDB");

const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"))

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
