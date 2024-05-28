const User = require('../models/User');

exports.getPublicProfiles = async (req, res) => {
  try {
    const users = await User.find({ isPublic: true }).select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });

    if (user.isPublic || (req.user && (req.user.id === user.id || req.user.isAdmin))) {
      res.json(user);
    } else {
      res.status(403).json({ msg: 'Access denied' });
    }
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
