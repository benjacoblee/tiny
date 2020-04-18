const express = require("express");
const app = express();
const connectDB = require("./config/connectDB");

const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/articles", require("./routes/api/articles"));
app.use("/api/articles/:id/comments", require("./routes/api/comments"));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
