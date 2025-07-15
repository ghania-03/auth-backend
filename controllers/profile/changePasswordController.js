const bcrypt = require('bcryptjs');
const User = require('../../models/User');

exports.changePassword = async (req, res) => {
  console.log("Token user ID:", req.user?.id);
console.log("Request body:", req.body);
  const userId = req.user.id;
  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (!currentPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({ msg: 'All password fields are required' });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ msg: 'New passwords do not match' });
  }

  const strongPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;
  if (!strongPassword.test(newPassword)) {
    return res.status(400).json({ msg: 'Password must be 8+ chars and include upper, lower, number, special character' });
  }

  try {
    const user = await User.findById(userId);
    console.log("Found user in DB:", user);

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: 'Current password is incorrect' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ msg: 'Password changed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
