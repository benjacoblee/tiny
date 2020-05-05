const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../../models/User");
const Article = require("../../models/Article");
const auth = require("../../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userID).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({
      msg: "Server error"
    });
  }
});

router.get("/dashboard", auth, async (req, res) => {
  try {
    let dashboardDetails;
    const userID = req.user.userID;
    const user = await User.findById(req.user.userID).select("-password");
    const articles = await Article.find({ postedBy: userID });
    const numberOfComments = articles.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.comments.length;
    }, 0);
    dashboardDetails = {
      user,
      articles,
      numberOfComments
    };
    res.json(dashboardDetails);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      msg: "Server error"
    });
  }
});

router.post(
  "/",
  [
    check("email", "Email must be valid!").isEmail(),
    check("password", "Password cannot be empty!").not().isEmpty(),
    check("password", "Password supplied is too short!").isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    let user;
    try {
      user = await User.findOne({ email });
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (!isMatch) {
          return res.status(400).json({
            errors: [
              {
                msg: "Invalid credentials"
              }
            ]
          });
        }

        try {
          jwt.sign(
            { userID: user._id },
            config.get("jwtSecret"),
            { expiresIn: 360000 },
            (err, token) => {
              res.json({
                token
              });
            }
          );
        } catch (err) {
          res.status(500).json({
            errors: [{ msg: err.message }]
          });
        }
      });
    } catch (err) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
    }
  }
);

module.exports = router;
