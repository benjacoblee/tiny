// find article, add comments to array
const express = require("express");
const router = express.Router({ mergeParams: true });
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Article = require("../../models/Article");
const Comment = require("../../models/Comment");

router.get("/", auth, (req, res) => {
  // get all comments for this article
});

router.post(
  "/",
  auth,
  [check("text", "Text cannot be empty!").not().isEmpty()],
  async (req, res) => {
    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { id } = req.params;
    const { text } = req.body;

    let article = await Article.findById(id);
    const comment = new Comment({
      text,
      postedBy: req.user.userID
    });

    try {
      await comment.save();
      article.comments = [...article.comments, comment._id];
      await article.save();

      article = await Article.findById(id)
        .populate({
          path: "comments",
          populate: {
            path: "postedBy",
            model: "User",
            select: ["name"]
          }
        })
        .populate({
          path: "postedBy",
          model: "User",
          select: ["name"]
        });

      res.json(article);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        msg: "Server error?"
      });
    }
    console.log(comment);
  }
);

router.patch("/:id", auth, (req, res) => {
  // edit comment
});

router.delete("/:id", auth, (req, res) => {
  // delete comment
});

module.exports = router;
