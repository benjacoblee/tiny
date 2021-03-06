const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Article = require("../../models/Article");
const User = require("../../models/User");
const Comment = require("../../models/Comment");

router.get("/", async (req, res) => {
  // just returns all articles for now. might need to use req.query for pagination or to find articles by tag
  const query = req.query.q;
  let page = req.query.page;
  if (page) {
    page = parseInt(req.query.page);
    const limit = 10;

    try {
      const articles = await Article.find({})
        .sort([["dateCreated", -1]])
        .skip(page * limit)
        .limit(limit)
        .populate({
          path: "postedBy",
          model: "User",
          select: ["fullName", "email"]
        })
        .populate({
          path: "comments",
          populate: {
            path: "postedBy",
            model: "User",
            select: ["fullName", "email"]
          }
        });

      res.json(articles);
    } catch (err) {
      res.json(err);
    }
  }

  if (query) {
    let articles = await Article.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { body: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } }
      ]
    })
      .populate({
        path: "postedBy",
        model: "User",
        select: ["fullName", "email"]
      })
      .populate({
        path: "comments",
        populate: {
          path: "postedBy",
          model: "User",
          select: ["fullName", "email"]
        }
      });

    res.json(articles);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const article = await Article.findById(id)
      .populate({
        path: "postedBy",
        model: "User",
        select: ["fullName", "email", "avatar", "bio"]
      })
      .populate({
        path: "comments",
        populate: {
          path: "postedBy",
          model: "User",
          select: ["fullName", "email", "avatar", "bio"]
        }
      });

    if (!article) {
      return res.json({
        msg: "Article doesn't exist"
      });
    }

    res.json(article);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(404).json({
        msg: "Article dosen't exist"
      });
    }

    return res.status(500).send("Server error");
  }
});

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

    const { title, body, tags, image } = req.body;

    let tagsArr = [];

    if (tags) {
      tagsArr = tags.split(",").map((tag) => {
        return tag.trim();
      });
    }

    try {
      const user = await User.findById(req.user.userID);
      let article = await new Article({
        title,
        body,
        tags: tagsArr,
        image,
        postedBy: user._id
      }).save();
      article.populate("postedBy", ["fullName"], (err) => {
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

    try {
      let article = await Article.findById(req.params.id).populate("postedBy");

      if (req.user.userID !== article.postedBy._id.toString()) {
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
          select: ["fullName"]
        })
        .populate(
          {
            path: "comments",
            populate: {
              path: "postedBy",
              model: "User",
              select: ["fullName"]
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

router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;

  try {
    const article = await Article.findById(id);
    console.log(article);
    if (req.user.userID !== article.postedBy.toString()) {
      return res.status(400).json({
        msg: "You don't have the permissions to delete this comment!"
      });
    }

    await Article.findByIdAndDelete(id);
    await Comment.deleteMany({ articleID: article._id });
    res.send("Article deleted");
  } catch (err) {
    res.status(500).json({
      msg: err.message
    });
  }
});

module.exports = router;
