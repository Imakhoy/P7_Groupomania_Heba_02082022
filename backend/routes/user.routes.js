const router = require("express").Router();
const userController = require("../controllers/user.controller");
const limit = require('../middleware/limit');
const email = require('../middleware/email');
const password = require('../middleware/password');

//AUTHENTIFICATION
router.post("/register",email,password,userController.signup);
router.post("/login", limit, userController.signin);
router.get("/logout", userController.logout);



module.exports = router;
