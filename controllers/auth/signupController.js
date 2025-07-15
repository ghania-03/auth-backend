const User = require('../../models/User');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password, dob, gender, phone } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ msg: 'Email already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const profileImage = req.files?.profileImage?.[0]?.path || null;
        const coverImage = req.files?.coverImage?.[0]?.path || null;

        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            dob,
            gender,
            phone,
            profileImage,
            coverImage
        });

        await user.save();
        res.status(201).json({ msg: 'User Created' });
    }
    catch(err) {
        console.log('SignUp Controller Error', err);
        res.status(500).json({ msg: 'Server error' });
    }
};