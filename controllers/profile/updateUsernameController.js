const User = require('../../models/User');

exports.updateUsername = async (req, res) => {
  const userId = req.user.id;
  const { newUsername } = req.body;

  if (!newUsername) {
    return res.status(400).json({ msg: 'New username is required' });
  }

  try {
    const user = await User.findById(userId);

    const lastUpdated = user.usernameLastUpdated || user.createdAt;
    const now = new Date();
    const diff = now - new Date(lastUpdated);

    const hoursPassed = diff / (1000 * 60 * 60);

    if (hoursPassed < 24) {
      const remaining = Math.ceil(24 - hoursPassed);
      return res.status(403).json({ msg: `Username can only be updated after ${remaining} more hour(s)` });
    }

    const usernameExists = await User.findOne({ username: newUsername });
    if (usernameExists) {
      return res.status(400).json({ msg: 'Username already taken' });
    }

    user.username = newUsername;
    user.usernameLastUpdated = now;
    await user.save();

    res.status(200).json({ msg: 'Username updated successfully', username: user.username });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
