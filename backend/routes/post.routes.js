const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer.middleware');
const postCtrl = require('../controllers/post.controller');

// Posts
//je dois mettre userId a la place de id
router.post("/",multer, postCtrl.createPost);
router.get("/", postCtrl.getAllPosts);
router.get("/:id", postCtrl.getOnePost);
router.put("/:id", multer, postCtrl.modifyPost);

router.delete("/:id", postCtrl.deletePost);
router.post("/:id/like", postCtrl.likePost);

module.exports = router;