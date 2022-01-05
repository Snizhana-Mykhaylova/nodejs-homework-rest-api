/* eslint-disable indent*/
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const {UsersService} = require('../services');
require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const params = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY,
};

passport.use(
  new JwtStrategy(params, async (payload, done) => {
    try {
      const serviseUser = new UsersService();
      const user = await serviseUser.findByID(payload.id);
      if (!user) {
        return done(new Error('User not found'));
      }
      if (!user.token) {
        return done(null, false);
      }
      return done(null, user);
    } catch (e) {
      done(e);
    }
  })
);
