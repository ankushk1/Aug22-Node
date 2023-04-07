const jwt = require("jsonwebtoken");

exports.validateJWT = async (req, res, next) => {
  try {
    const token = req.headers["access-token"];

    if (!token) {
      return res.status(400).json({ message: "JWT is required" });
    }

    jwt.verify(token, "secret", function (err, decoded) {
      if (err) {
        return res.status(400).json({ err });
      }

      console.log(decoded);

      req.body.userId = decoded._id
      next();
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
