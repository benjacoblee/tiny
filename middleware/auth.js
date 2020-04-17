const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({
      msg: "No token, authorization denied"
    });
  }

  try {
    jwt.verify(token, config.get("jwtSecret"), (err, decoded) => {
      console.log(decoded)
      req.user = decoded;
      next();
    });
  } catch (err) {
    res.status(401).json({
      msg: "Invalid token, authorization denied"
    });
  }
};
