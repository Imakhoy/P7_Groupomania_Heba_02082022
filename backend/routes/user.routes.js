const express = require('express');
const router = express.Router();
const password = require('../middleware/password.validator');
const limiter = require('../middleware/limit');
const userCtrl = require('../controllers/user.controller');


router.post('/signup',password, userCtrl.signup);
router.post('/login',limiter, userCtrl.login);
router.post('/login', userCtrl.login);
router.get('/logout', userCtrl.logout);

module.exports = router;