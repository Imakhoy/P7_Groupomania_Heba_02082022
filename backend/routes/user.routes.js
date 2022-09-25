const express = require('express');
const limit = require('../middleware/limit');
const password = require('../middleware/password.validator');

const router = express.Router();
const userCtrl = require('../controllers/user.controller');

//Authentification
router.post('/signup',password, userCtrl.signup);
router.post('/login',limit.limiter, userCtrl.login);
router.get('/logout', userCtrl.logout);

// Comptes utilisateurs
router.get("/", userCtrl.getAllUsers);
router.get("/:userId", userCtrl.getUser);
router.put("/:userId", multer, userCtrl.updateUser);
router.put("/:userId/password", userCtrl.updatePassword);
router.delete("/delete/:userId", userCtrl.deleteUser);

module.exports = router;


