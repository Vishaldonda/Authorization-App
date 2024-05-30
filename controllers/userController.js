const User = require('../models/User');

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateUserProfile = async (req, res) => {
    const { name, email, password, photo, bio, phone, isPublic } = req.body;

    try {
        const user = await User.findById(req.user.id);

        if (user) {
            user.name = name || user.name;
            user.email = email || user.email;
            if (password) {
                user.password = password;
            }
            user.photo = photo || user.photo;
            user.bio = bio || user.bio;
            user.phone = phone || user.phone;
            user.isPublic = isPublic !== undefined ? isPublic : user.isPublic;

            const updatedUser = await user.save();

            res.json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getPublicProfiles = async (req, res) => {
    try {
        const users = await User.find({ isPublic: true });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAllProfiles = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
