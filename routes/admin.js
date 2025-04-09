const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');
const { verifyToken, verifyRole } = require('../middleware/verifyToken');


router.get('/', verifyToken, verifyRole(["superadmin"]), adminController.getAllAdmins);
router.get('/inactive', verifyToken, verifyRole(["superadmin"]), adminController.getAllInactiveAdmins);
router.get('/active', verifyToken, verifyRole(["admin", "superadmin"]), adminController.getAllActiveAdmins);
router.get('/:id', verifyToken, verifyRole(["admin", "superadmin"]), adminController.getAdminById);
router.put('/:id', verifyToken, verifyRole(["superadmin"]), adminController.updateAdmin);
router.delete('/:id', verifyToken, verifyRole(["superadmin"]), adminController.deleteAdmin);

module.exports = router;