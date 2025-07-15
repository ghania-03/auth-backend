const nodemailer = require('nodemailer');

exports.sendOTPEmail = async (toEmail, otp, name= 'there') => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: toEmail,
        subject: 'Reset Password - OTP',
        html: `
        <div style="font-family: Arial, sans-serif; background-color: #f6f6f6; padding: 20px;">
            <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                <p>Hi ${name},</p>
                <h2 style="color: #333;">Password Reset Request</h2>
                <p style="font-size: 16px;">You requested to reset your password for your account.</p>
                <p style="font-size: 16px;">Use the following OTP to reset your password:</p>
        <div style="text-align: center; margin: 20px 0;">
        <span style="display: inline-block; font-size: 28px; letter-spacing: 8px; font-weight: bold; background: #f0f0f0; padding: 10px 20px; border-radius: 6px;">
          ${otp}
        </span>
        </div>
            <p style="font-size: 14px; color: #888;">This OTP is valid for only 5 minutes. If you didn’t request this, you can safely ignore it.</p>
             <p style="font-size: 14px; color: #888;">Thanks,<br>Auth Team</p>
        </div>
        <p style="text-align: center; font-size: 12px; color: #aaa; margin-top: 20px;">
            © ${new Date().getFullYear()} Auth. All rights reserved.
        </p>
        </div>
        `
    };

    await transporter.sendMail(mailOptions);
};