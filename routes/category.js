const router = require('express').Router();
const categoryController = require('../controller/categoryController');
const { verifyToken, verifyRole } = require('../middleware/verifyToken');

router.post('/', verifyToken, verifyRole(["admin", "superadmin"]), categoryController.createCategory);
router.get('/:id', verifyToken, categoryController.getCategoryById);
router.get('/', verifyToken, categoryController.getAllCategory);
router.put('/:id', verifyToken, verifyRole(["admin", "superadmin"]), categoryController.updateCategory);
router.delete('/:id', verifyToken, verifyRole(["admin", "superadmin"]), categoryController.deleteCategory);

module.exports = router