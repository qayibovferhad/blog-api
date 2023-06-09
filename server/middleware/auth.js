const jwtsecret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const authMiddleware = async (req, res, next) => {
  const token = req.cookies["app_access_token"];
  if (!token) {
    res.status(401).send({
      message: "Unauthorized request",
    });
    return;
  }
  if (token) {
    jwt.verify(token, jwtsecret, function (err, decoded) {
      if (err) {
        res.status(401).send({
          message: err,
        });
        return;
      }
      const { exp, iat, ...userData } = decoded;
      if (exp < Date.now() / 1000) {
        res.status(401).send({
          message: "Your session is expired!",
        });
      } else {
        req.user = userData;
        next();
      }
    });
  } else {
    res.status(401).send({
      message: "Unauthorized request",
    });
  }
};
module.exports = authMiddleware;
