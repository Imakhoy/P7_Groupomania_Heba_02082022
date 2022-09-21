const express = require('express');
const limit = require('../middleware/limit');
const password = require('../middleware/password.validator');

const router = express.Router();
const userCtrl = require('../controllers/user.controller');


router.post('/signup',password, userCtrl.signup);
router.post('/login',limit.limiter, userCtrl.login);
router.get('/logout', userCtrl.logout);
router.delete('/delete/:userId', userCtrl.deleteUser);

module.exports = router;
