const jwtsecret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const authMiddleware = async (req, res, next) => {
  const token = req.headers["authorization"];
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
      if (decoded.exp < Date.now() / 1000) {
        res.status(401).send({
          message: "Your session is expired!",
        });
      } else {
        req.user = decoded.data;
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
