const express = require('express');
const router = express.Router();
const { signup } = require('../controllers/auth/signupController.js');
const { validateSignup } = require('../middleware/validateSignup.js');
const upload = require('../middleware/uploadImages.js')
const {login} = require('../controllers/auth/loginController.js');
const {sendForgotPasswordOTP} = require('../controllers/auth/forgotPasswordController.js');
const {otpRequestLimiter} = require('../middleware/rateLimiter.js');
const {verifyOtp} = require('../controllers/auth/verifyOtpController.js');
const {resetPassword} = require('../controllers/auth/resetPasswordController.js');

router.post('/signup', upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 }
]), validateSignup, signup);

router.post('/login', login);

router.post('/forgot-password', otpRequestLimiter, sendForgotPasswordOTP);

router.post('/verify-otp', verifyOtp);

router.post('/reset-password', resetPassword);

module.exports = router;