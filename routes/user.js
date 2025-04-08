const router = require('express').Router();
const userController = require('../controller/userController');
const followerController = require('../controller/followController');
const { verifyToken, verifyRole } = require('../middleware/verifyToken');


router.get('/', verifyToken, verifyRole(["admin", "superadmin"]), userController.getAllUsers);
router.get('/:id', verifyToken, userController.getUserById);
router.put('/:id', verifyToken, verifyRole(["admin", "superadmin"]), userController.updateUser);
router.delete('/:id', verifyToken, verifyRole(["admin", "superadmin"]), userController.deleteUser);
router.post('/follow/:id', verifyToken, followerController.followUser);
router.delete('/unfollow/:id', verifyToken, followerController.unfollowUser);
router.get('/followers/:id', verifyToken, followerController.getFollowers);
router.get('/following/:id', verifyToken, followerController.getFollowing);


module.exports = router;
