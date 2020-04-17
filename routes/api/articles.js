const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Article = require("../../models/Article");

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

    let tagsArr = [];

    if (tags) {
      tagsArr = tags.split(",").map((tag) => {
        return tag.trim();
      });
    }

    let article = new Article({
      title,
      body,
      tags: tagsArr,
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

router.patch(
  "/:id",
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

    let article = await Article.findById(req.params.id);

    if (req.user.userID !== article.userID) {
      return res.status(400).json({
        msg: "Must be author of article to edit!"
      });
    }

    const { title, body, tags } = req.body;
    let tagsArr = [];

    if (tags) {
      tagsArr = tags.split(",").map((tag) => {
        return tag.trim();
      });
    }

    try {
      article = await Article.findOneAndUpdate(
        {
          _id: req.params.id
        },
        {
          title,
          body,
          tags: tagsArr,
          dateEdited: Date.now()
        },
        { new: true }
      );

      res.json(article);
    } catch (err) {
      res.status(500).json({
        msg: err.message
      });
    }
  }
);

module.exports = router;
