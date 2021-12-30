const express = require('express');
const {signUp, logIn, logOut, currentUser} = require('../../controllers/users');
/* eslint-disable-next-line */
const router = express.Router();
const guard = require('../../helpers/guard');
const {regLogValidation} = require('../../validation/users');

router.post('/signup', regLogValidation, signUp);
router.post('/login', regLogValidation, logIn);
router.post('/logout', guard, logOut);
router.get('/current', guard, currentUser);

module.exports = router;
