const router = require('express').Router();
const commentController = require('../controller/commentController');
const { verifyToken, verifyRole } = require('../middleware/verifyToken');

router.get('/:id', verifyToken, commentController.getCommentById);
router.put('/:id', verifyToken,verifyRole(["moderator", "admin", "superadmin"]), commentController.updateComment);
router.delete('/:id', verifyToken,verifyRole(["moderator", "admin", "superadmin"]), commentController.deleteComment);
router.post('/like/:id', verifyToken, commentController.likeComment);
router.post('/unlike/:id', verifyToken, commentController.unlikeComment);

module.exports = router;