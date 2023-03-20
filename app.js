const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const User = require("./models/user");
const Session = require("./models/sessions");
const blogRoutes = require("./routes/blogRoutes");
const userRoutes = require("./routes/userRoutes");
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use("/api/v1", blogRoutes);
app.use("/api/v1", userRoutes);
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

mongoose.connect(CONNECTION_STRING);

module.exports = app;
