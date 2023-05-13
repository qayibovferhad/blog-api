const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const User = require("../models/user");
const crypto = require("crypto");
const SALT = process.env.PASSWORD_SALT;

passport.use(
  new localStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const hashedPassword = crypto
          .pbkdf2Sync(password, SALT, 100000, 64, "sha512")
          .toString("hex");
        const user = await User.findOne({ email, password: hashedPassword })
          .select("_id firstname lastname username email image")
          .exec();
        if (user) {
          return done(null, user.toObject());
        }
        return done(null, false);
      } catch (err) {
        return done(err);
      }
    }
  )
);
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: (req) => req.cookies["app_access_token"],
      secretOrKey: process.env.JWT_SECRET,
    },
    (jwtPayload, done) => {
      if (Date.now() > jwtPayload.exp * 1000) {
        return done("jwt expired");
      }
      return done(null, jwtPayload);
    }
  )
);
