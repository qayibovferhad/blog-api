const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const jwtStrategy = require("passport-jwt").Strategy;
const User = require("../models/user");
const SALT = process.env.PASSWORD_SALT;

passport.use(
  new localStrategy(
    { emailField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const hashedPassword = crypto
          .pbkdf2Sync(password, SALT, 100000, 64, "sha512")
          .toString("hex");
        const user = await User.findOne({ email, password: hashedPassword })
          .select("_id firstname lastname username email image")
          .exec();
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (err) {
        done(err);
      }
    }
  )
);
