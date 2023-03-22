const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
const blogRoutes = require("./routes/blogRoutes");
const userRoutes = require("./routes/userRoutes");
const app = express();
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

mongoose.connect(CONNECTION_STRING);
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 4,
// });
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
// app.use(limiter);
app.use("/api/v1", userRoutes);
app.use("/api/v1", blogRoutes);

module.exports = app;
