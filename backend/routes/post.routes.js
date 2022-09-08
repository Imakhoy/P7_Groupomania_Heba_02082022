const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const multer = require('../middleware/multer.middleware');
const postCtrl = require('../controllers/post.controller');

// Posts

//router.post
//router.get
//router.get
//router.get
//router.put
//router.delete

router.post("/:id/like", postCtrl.likePost);

module.exports = router;