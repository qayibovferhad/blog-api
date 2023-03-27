const jwtsecret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    res.status(401).send({
      message: "Unauthorized request",
    });
    return;
  }
  const token = authHeader.replace("Bearer ", "");
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
  }
};
module.exports = authMiddleware;
