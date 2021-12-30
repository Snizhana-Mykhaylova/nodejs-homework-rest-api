const passport = require('passport');
require('../config/passport');
const {HttpCode} = require('../helpers/constants');

const guard = (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer')
  ) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: HttpCode.UNAUTHORIZED,
      message: 'Not authorized',
    });
  }

  passport.authenticate('jwt', {session: false}, (err, user) => {
    if (err || !user) {
      console.log('no user');
      return next({
        status: HttpCode.FORBIDDEN,
        message: 'Forbidden',
      });
    }
    req.user = user;
    console.log(req.user);
    return next();
  })(req, res, next);
};

module.exports = guard;
