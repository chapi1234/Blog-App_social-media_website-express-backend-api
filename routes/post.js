const router = require('express').Router();
const postController = require('../controller/postController');
const upload = require('../functions/uploadFile');
const { verifyToken, verifyRole } = require('../middleware/verifyToken');

router.post('/create', upload, verifyToken, postController.createPost);
router.get('/all', verifyToken, postController.getAllPosts);
router.get('/single/:id', verifyToken, postController.getPostById);
router.get('/user/:id', verifyToken, postController.getUserPosts);
router.put('/update/:id', verifyToken, postController.updatePost);
router.delete('/delete/:id', verifyToken, verifyRole(["moderator", "admin", "superadmin"]), postController.deletePost);
router.post('/like/:id', verifyToken, postController.likePost);
router.post('/unlike/:id', verifyToken, postController.unlikePost);
router.post('/share/:id', verifyToken, postController.sharePost);
router.post('/comment/:id', verifyToken, postController.commentPost);
router.get('/comment/:id', verifyToken, postController.getPostComments);

module.exports = router; 