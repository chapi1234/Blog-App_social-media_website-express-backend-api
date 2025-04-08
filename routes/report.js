const router = require('express').Router();
const reportController = require('../controller/reportController');
const { verifyToken, verifyRole } = require('../middleware/verifyToken');

router.post('/', verifyToken, reportController.createReport);
router.get('/', reportController.getAllReports);
router.get('/:id', reportController.getReportById)
router.put('/:id', reportController.updateReportStatus); 
router.delete('/:id', reportController.deleteReport)

module.exports = router;