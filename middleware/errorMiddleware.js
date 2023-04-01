const errorMiddleware = (err, req, res, next) => {
  let message = err || "Something went wrong..";
  if (process.env.NODE_ENV === "production") {
    message = "Something went wrong..";
    return;
  }
  res.status(500).send({
    message,
  });
};
module.exports = errorMiddleware;
