const express = require("express");
const app = express();
const connectDB = require("./config/connectDB");

const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/articles", require("./routes/api/articles"));
app.use("/api/articles/:id/comments", require("./routes/api/comments"));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
