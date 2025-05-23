const router = require('express').Router();
const authController = require('../controller/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh', authController.refreshToken);
router.post('/verify-otp', authController.verifyOtp)
router.post('/logout', authController.logout);

module.exports = router;