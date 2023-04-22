require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const notFound = require("./middleware/notFound");
const blogRoutes = require("./routes/blogRoutes");
const userRoutes = require("./routes/userRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");
const path = require("path");
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

mongoose.connect(CONNECTION_STRING);
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
});

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
app.use("/public", express.static(path.resolve("public")));
app.use(limiter);
app.use("/api/v1", userRoutes);
app.use("/api/v1", blogRoutes);
app.all("*", notFound);
app.use(errorMiddleware);

module.exports = app;