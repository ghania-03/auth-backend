const fs = require('fs');
const path = require('path');
const User = require('../../models/User');

exports.updateProfileImages = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    if (req.files.profileImage) {
      if (user.profileImage && fs.existsSync(user.profileImage)) {
        fs.unlinkSync(user.profileImage);
      }
      user.profileImage = req.files.profileImage[0].path;
    }

    if (req.files.coverImage) {
      if (user.coverImage && fs.existsSync(user.coverImage)) {
        fs.unlinkSync(user.coverImage);
      }
      user.coverImage = req.files.coverImage[0].path;
    }

    await user.save();

    res.status(200).json({
      msg: 'Images updated successfully',
      profileImage: user.profileImage,
      coverImage: user.coverImage
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
