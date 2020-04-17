const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    console.log(req.user.userID);
    const user = await User.findById(req.user.userID).select("-password")
    console.log(user);
    res.json(user);
  } catch (err) {
    res.status(500).json({
      msg: "Server error"
    });
  }
});

module.exports = router;
