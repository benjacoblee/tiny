// find article, add comments to array
const express = require("express");
const router = express.Router({ mergeParams: true });
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Article = require("../../models/Article");
const Comment = require("../../models/Comment");

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

    try {
      let article = await Article.findById(id);
      const comment = new Comment({
        text,
        postedBy: req.user.userID,
        articleID: article._id
      });

      await comment.save();
      article.comments = [...article.comments, comment._id];
      await article.save();

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
      console.log(err);
      res.status(500).json({
        msg: "Server error?"
      });
    }
    console.log(comment);
  }
);

router.patch(
  "/:commentID",
  auth,
  [check("text", "Text must not be empty!").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    const { id, commentID } = req.params;

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    try {
      let comment = await Comment.findById(commentID);

      if (req.user.userID !== comment.postedBy.toString()) {
        return res.status(400).json({
          msg: "Only owner of comment can edit!"
        });
      }

      const text = req.body.text;

      comment.text = text;
      comment.dateEdited = Date.now();

      await comment.save();

      let article = await Article.findById(id)
        .populate({
          path: "postedBy",
          select: ["name"],
          model: "User"
        })
        .populate({
          path: "comments",
          populate: {
            path: "postedBy",
            select: ["name"],
            model: "User"
          }
        });

      res.json(article);
    } catch (err) {
      res.status(500).json({
        msg: err.message
      });
    }
  }
);

router.delete("/:commentID", auth, async (req, res) => {
  const { id, commentID } = req.params;

    try {
       let article = await Article.findById(id);
       const comment = await Comment.findById(commentID);

       if (req.user.userID !== comment.postedBy.toString()) {
         return res.status(400).json({
           msg: "Only owner of comment can delete!"
         });
       } 
       
      await Comment.findByIdAndDelete(commentID);

      article.comments = article.comments.filter((comment) => {
        return comment._id.toString() !== commentID;
      });

      article = await article.save();
      article
        .populate({
          path: "postedBy",
          select: ["name"]
        })
        .populate(
          {
            path: "comments",
            populate: {
              path: "postedBy",
              select: ["name"]
            }
          },
          (err) => {
            res.json(article);
          }
        );
    } catch (err) {
      res.status(500).json({
        msg: err.message
      });
    }
  
});

module.exports = router;
