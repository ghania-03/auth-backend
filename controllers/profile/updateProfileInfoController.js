const User = require('../../models/User');

exports.updateProfileInfo = async (req, res) => {
  const { phone, gender, dob } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    if (phone) user.phone = phone;
    if (gender) user.gender = gender;
    if (dob) user.dob = dob;

    await user.save();

    res.status(200).json({ msg: 'Profile updated successfully', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};