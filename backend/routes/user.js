const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

const auth = require('../middleware/auth');
const limiter = require('../middleware/limiter')
const emailValid = require('../middleware/emailvalidator');
const passwordValid = require('../middleware/passwordvalidator')

router.post('/signup', emailValid, passwordValid, userCtrl.signup);
router.post('/login', limiter, userCtrl.login);
router.get('/logout', userCtrl.logout);

router.get('/user/', auth, userCtrl.getAllUser);
router.get('/user/:id', auth, userCtrl.getUser);

module.exports = router;