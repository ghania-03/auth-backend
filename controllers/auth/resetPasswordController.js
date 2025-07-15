const User = require('../../models/User');
const Otp = require('../../models/Otp');
const bcrypt = require('bcryptjs');

exports.resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ msg: 'User not found' });

        const otpEntry = await Otp.findOne({ email });
        if (!otpEntry) return res.status(400).json({ msg: 'OTP must be verified first' });

        if (otpEntry.expiresAt < new Date()) {
            await Otp.deleteOne({ email }); 
            return res.status(400).json({ msg: 'OTP expired' });
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!passwordRegex.test(newPassword)) {
            return res.status(400).json({ msg: 'Password does not meet strength requirements' });
        }
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        await Otp.deleteOne({ email });

        res.status(200).json({ msg: 'Password reset successful' });

    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }

};