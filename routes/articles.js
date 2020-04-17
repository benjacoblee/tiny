const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const Article = require("../models/Article");

router.post(
  "/",
  auth,
  [
    check("title", "Title is required!").not().isEmpty(),
    check("body", "Body is required!").not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { title, body, tags } = req.body;
    const { userID } = req.user;
    
    let article = new Article({
      title,
      body,
      tags: tags.split(",").map((tag) => {
        return tag.trim();
      }),
      userID
    });

    try {
      await article.save();
      res.json(article);
    } catch (err) {
      res.status(500).json({
        msg: err.message
      });
    }
  }
);

module.exports = router;
