const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/', auth, postCtrl.getAllPost);
router.post('/opinionPost/:id', auth, postCtrl.opinionPost);
router.post('/', auth, multer.single("post_image"), postCtrl.createPost);
router.delete('/:id', auth, postCtrl.deletePost);

router.put('/:id', auth, multer.single("post_image"), postCtrl.modifyPost);


module.exports = router;