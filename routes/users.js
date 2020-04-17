const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/user");

router.post(
  "/",
  [
    check("name", "Name cannot be empty!").not().isEmpty(),
    check("email", "Needs to be a valid email!").isEmail(),
    check(
      "password",
      "Password needs to be a minimum of 6 characters!"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    let user = new User({
      name,
      email
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.avatar = gravatar.url(email, { s: "200", r: "pg", d: "retro" });

    try {
      const result = await user.save();
      console.log(user._id);

      jwt.sign(
        {userID: user._id},
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          res.json({
            token
          });
        }
      );
    } catch (err) {
      res.status(400).json({
        msg: err.message
      });
    }
  }
);

module.exports = router;
