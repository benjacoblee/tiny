const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../../models/User");
const auth = require("../../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userID).select("-password");
    console.log(user);
    res.json(user);
  } catch (err) {
    res.status(500).json({
      msg: "Server error"
    });
  }
});

router.post(
  "/",
  [
    check("email", "Needs to be a valid email").isEmail(),
    check("password", "Password cannot be empty!").not().isEmpty(),
    check("password", "Password supplied is too short").isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (!isMatch) {
        return res.status(400).json({
          msg: "Invalid credentials provided"
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
          msg: err.message
        });
      }
    });
  }
);

module.exports = router;
