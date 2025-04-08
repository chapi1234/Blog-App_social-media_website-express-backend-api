const router = require('express').Router();
const superadminController = require('../controller/superadminController');
const { verifyToken, verifyRole } = require('../middleware/verifyToken');

router.post('/create-admin', verifyToken, verifyRole(["superadmin"]), superadminController.CreateAdmin);
router.post('/create-moderator', verifyToken, verifyRole(["superadmin"]), superadminController.CreateModerator);
router.post('/activate-admin', verifyToken, verifyRole(["superadmin"]), superadminController.ActivateAdmin);
router.post('/activate-moderator', verifyToken, verifyRole(["superadmin"]), superadminController.ActivateModerator);
router.post('/deactivate-admin', verifyToken, verifyRole(["superadmin"]), superadminController.DeactivateAdmin);
router.post('/deactivate-moderator', verifyToken, verifyRole(["superadmin"]), superadminController.DeactivateModerator);


module.exports = router;