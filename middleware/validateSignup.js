const { body, validationResult } = require('express-validator');

exports.validateSignup = [
    body('firstName')
        .trim()
        .notEmpty().withMessage('First name is required')
        .isLength({ min: 2, max: 30 }).withMessage('First name must be 2–30 characters')
        .matches(/^[a-zA-Z\s]+$/).withMessage('First name must contain only letters and spaces'),

    body('lastName')
        .trim()
        .notEmpty().withMessage('Last name is required')
        .isLength({ min: 2, max: 30 }).withMessage('Last name must be 2–30 characters')
        .matches(/^[a-zA-Z\s]+$/).withMessage('Last name must contain only letters and spaces'),
    body('email')
        .isEmail()
        .withMessage('Invalid Email Format'),

    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters')
        .matches(/[A-Z]/)
        .withMessage('Must Contain Uppercase Letter')
        .matches(/[a-z]/)
        .withMessage('Must Contain Lowercase Letter')
        .matches(/[0-9]/)
        .withMessage('Must Contain a Number')
        .matches(/[^a-zA-Z0-9]/)
        .withMessage('Must Contain Special Character'),

    body('dob')
        .notEmpty()
        .withMessage('Date of Birth is required')
        .custom(value => {
            const dob = new Date(value);
            const age = new Date().getFullYear() - dob.getFullYear();
            if (age <= 15) {
                throw new Error('Age must be greater than 15');
            }
            return true;
        }),

    body('gender')
        .isIn(['male', 'female', 'custom'])
        .withMessage('Invalid gender'),

    body('phone')
        .matches(/^\+\d{10,15}$/)
        .withMessage("Phone must include country code starting with '+' and be valid"),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array().map((err) => err.msg) });
        }

        next();
    }
];