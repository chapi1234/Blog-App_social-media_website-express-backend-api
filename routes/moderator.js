const router = require('express').Router();
const moderatorController = require('../controller/moderatorController');

const { verifyToken, verifyRole } = require('../middleware/verifyToken'); 

router.get('/', verifyToken, verifyRole(["admin", "superadmin"]), moderatorController.getAllModerators);
router.get('/active', verifyToken, verifyRole(["admin", "superadmin"]), moderatorController.getAllActiveModerators);
router.get('/inactive', verifyToken, verifyRole(["admin", "superadmin"]), moderatorController.getAllInactiveModerators);
router.get('/:id', verifyToken, verifyRole(["admin", "superadmin"]), moderatorController.getModeratorById);
router.put('/:id', verifyToken, verifyRole(["admin", "superadmin"]), moderatorController.updateModerator);
router.delete('/:id', verifyToken, verifyRole(["admin", "superadmin"]), moderatorController.deleteModerator);


module.exports = router;