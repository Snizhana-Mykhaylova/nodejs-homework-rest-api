/* eslint-disable indent*/
const {AuthService, UsersService} = require('../services');
const {HttpCode} = require('../helpers/constants');

const serviseUser = new UsersService();
const serviseAuth = new AuthService();

const signUp = async (req, res, next) => {
  const user = await serviseUser.findByEmail(req.body.email);
  if (user) {
    return next({
      status: HttpCode.CONFLICT,
      data: 'Conflict',
      message: 'Email in use',
    });
  }
  try {
    const newUser = await serviseUser.create(req.body);
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (e) {
    next(e);
  }
};
const logIn = async (req, res, next) => {
  const {email, password} = req.body;

  try {
    const token = await serviseAuth.logIn({email, password});
    if (token) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          token,
          user: {email, password},
        },
      });
    }
    next({
      status: HttpCode.UNAUTHORIZED,
      message: 'Email or password is wrong',
    });
  } catch (e) {
    next(e);
  }
};
const logOut = async (req, res, next) => {
  const userId = req.user.id;
  await serviseAuth.logOut(userId);
  return res
    .status(HttpCode.NO_CONTENT)
    .json({status: 'sucsess', code: HttpCode.NO_CONTENT});
};

const avatars = async (req, res, next) => {
  const userId = req.user.id;
  const pathFile = req.file.path;
  const url = await serviseUser.updateAvatar(userId, pathFile);
  return res
    .status(HttpCode.OK)
    .json({status: 'sucsess', code: HttpCode.OK, avatarURL: url});
};

const currentUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const currentUser = await serviseUser.findByID(userId);
    const {email, subscription} = currentUser;
    if (currentUser) {
      return res.status(HttpCode.OK).json({
        status: 'sucsess',
        code: HttpCode.OK,
        data: {email, subscription},
      });
    }
    next({
      status: HttpCode.UNAUTHORIZED,
      message: 'Not authorized',
    });
  } catch (e) {
    next(e);
  }
};

const verify = async (req, res, next) => {};

module.exports = {signUp, logIn, logOut, avatars, currentUser, verify};
