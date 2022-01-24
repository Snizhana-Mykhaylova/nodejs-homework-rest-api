const express = require('express');
const {
  signUp,
  logIn,
  logOut,
  currentUser,
  avatars,
  verify,
  reVerify,
} = require('../../controllers/users');
/* eslint-disable-next-line */
const router = express.Router();
const guard = require('../../helpers/guard');
const upload = require('../../helpers/multer');
const {
  regLogValidation,
  reVerifyValidation,
} = require('../../validation/users');

router.post('/signup', regLogValidation, signUp);
router.post('/login', regLogValidation, logIn);
router.post('/logout', guard, logOut);
router.get('/current', guard, currentUser);
router.get('/verify/:verificationToken', verify);
router.post('/verify', reVerifyValidation, reVerify);
router.patch('/avatars', guard, upload.single('avatars'), avatars);

module.exports = router;
