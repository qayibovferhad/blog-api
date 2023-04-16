const notFound = (req, res) => {
  res.status(404).send({
    message: "Requested URL not found.",
  });
};

module.exports = notFound;
