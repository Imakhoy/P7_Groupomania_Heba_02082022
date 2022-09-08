const express = require('express');
const router = express.Router();
const password = require("../middleware/password.validator");
const auth = require('../middleware/auth.middleware');
const multer = require('../middleware/multer.middleware');
const userCtrl = require('../controllers/user.controller');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/logout', userCtrl.logout);

module.exports = router;