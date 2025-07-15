const rateLimit = require('express-rate-limit');

exports.otpRequestLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 3,
    message: {msg:  "Too many OTP requests. Please try again after 15 minutes"}
});