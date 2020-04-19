const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Article = require("../../models/Article");
const User = require("../../models/User");

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

    const user = await User.findById(req.user.userID);

    try {
      let article = await new Article({
        title,
        body,
        tags: tagsArr,
        postedBy: user._id
      }).save();
      article.populate("postedBy", ["name"], (err) => {
        res.json(article);
      });
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

    let article = await Article.findById(req.params.id).populate("postedBy");

    if (req.user.userID.toString() !== article.postedBy._id.toString()) {
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

      article
        .populate({
          path: "postedBy",
          model: "User",
          select: ["name"]
        })
        .populate(
          {
            path: "comments",
            populate: {
              path: "postedBy",
              model: "User",
              select: ["name"]
            }
          },
          (err) => {
            res.send(article);
          }
        );
    } catch (err) {
      res.status(500).json({
        msg: err.message
      });
    }
  }
);

module.exports = router;
