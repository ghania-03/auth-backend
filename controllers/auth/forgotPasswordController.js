const User = require('../../models/User');
const Otp = require('../../models/Otp');
const {sendOTPEmail} = require('../../utils/sendEmail');

const bcrypt = require('bcryptjs');


exports.sendForgotPasswordOTP = async (req, res) => {
    try{
        const {email} = req.body;

        const user = await User.findOne({email});
        if(!user) return res.status(400).json({msg: 'User not found'});

        const otp = Math.floor(100000 + Math.random() * 900000).toString();


        const expiresAt = new Date(Date.now() + 5 * 60 * 1000 );

        const hashedOtp = await bcrypt.hash(otp, 10);

        await Otp.findOneAndUpdate(
            { email },
            { otp: hashedOtp, expiresAt},
            {upsert: true, new: true}
        );
        
        const fullName = `${user.firstName} ${user.lastName}`;

        await sendOTPEmail(email, otp, fullName);
        
        res.status(200).json({msg: 'OTP sent to email'});
    }
    catch(error){
        console.error('Forget Password Controller Error: ', error);
        res.status(500).json({ msg: 'Failed to send OTP' });
    }
};