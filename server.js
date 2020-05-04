const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/connectDB");
const { generateGetUrl, generatePutUrl } = require("./config/AWSPresigner");

const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/articles", require("./routes/api/articles"));
app.use("/api/articles/:id/comments", require("./routes/api/comments"));

app.get("/generate-get-url", (req, res) => {
  // Both Key and ContentType are defined in the client side.
  // Key refers to the remote name of the file.
  const { Key } = req.query;
  generateGetUrl(Key)
    .then((getURL) => {
      res.send(getURL);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/generate-put-url", (req, res) => {
  // Both Key and ContentType are defined in the client side.
  // Key refers to the remote name of the file.
  // ContentType refers to the MIME content type, in this case image/jpeg
  const { Key, ContentType } = req.query;
  generatePutUrl(Key, ContentType)
    .then((putURL) => {
      res.send({ putURL });
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/get-object", async (req, res) => {
  console.log(req.query);
  let response = await getObject(req.query.Key);
  console.log(response);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
