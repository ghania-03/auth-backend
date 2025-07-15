const Otp = require('../../models/Otp');
const bcrypt = require('bcryptjs');

exports.verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const otpEntry = await Otp.findOne({ email });

        if (!otpEntry) return res.status(400).json({ msg: 'OTP not found or expired' });

        if (otpEntry.expiresAt < new Date()) {
            await Otp.deleteOne({ email });
            return res.status(400).json({ msg: 'OTP expired' });
        }
        const isMatch = await bcrypt.compare(otp, otpEntry.otp);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid OTP' });

        res.status(200).json({ msg: 'OTP verified successfully' });
    }
    catch (error) {
        console.log('Verify OTP Controller Error: ', error)
        res.status(500).json({ msg: 'Server error' });
    }
}