// find article, add comments to array
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Article = require("../../models/Article");
const Comment = require("../../models/Comment");

router.get("/", (req, res) => {
  // get all comments for this article
});

router.post("/", (req, res) => {
  // post new comment
});

router.patch("/:id", (req, res) => {
  // edit comment
});

router.delete("/:id", (req, res) => {
  // delete comment
});

module.exports = router;
