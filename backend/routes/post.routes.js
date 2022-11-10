const router = require("express").Router();
const postController = require("../controllers/post.controller");
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// post display
router.get('/', postController.getPosts);
router.post('/', auth, multer, postController.addPost);
router.put('/:id', auth, multer, postController.updatePost);
router.delete('/:id', auth, multer, postController.deletePost);
//like 
router.patch('/:id/like', auth, postController.likePost);
router.patch('/unlike-post/:id', postController.unlikePost);

module.exports = router;
