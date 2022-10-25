const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer.middleware');
const postCtrl = require('../controllers/post.controller');

// Posts
router.post("/",multer, postCtrl.createPost);
router.get("/", postCtrl.getAllPosts);
router.get("/:userId", postCtrl.getOnePost);
router.put("/:userId", multer, postCtrl.modifyPost);

router.delete("/:userId", postCtrl.deletePost);
router.post("/:userId/like", postCtrl.likePost);

module.exports = router;