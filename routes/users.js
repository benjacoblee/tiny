const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
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
      email,
      password
    });

    try {
      let result = await user.save();
      res.send(result);
    } catch (err) {
      console.log(err.message);
    }
  }
);

module.exports = router;
