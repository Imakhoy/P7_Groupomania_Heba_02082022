const router = require("express").Router();
const postController = require("../controllers/post.controller");

//const auth = require('../middleware/auth');
//const multer = require('../middleware/multer-config');

//CRUD POST
router.get('/', postController.getPosts);
router.post('/', postController.addPosts);


router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
//like 
router.patch('/like-post/:id', postController.likePost);
router.patch('/unlike-post/:id', postController.unlikePost);

module.exports = router;
