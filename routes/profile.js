const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile, getPublicProfiles, getAllProfiles } = require('../controllers/userController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Get user profile
router.get('/me', auth, getUserProfile);

// Update user profile
router.put('/me', auth, updateUserProfile);

// Get all public profiles
router.get('/public', getPublicProfiles);

// Get all profiles (admin only)
router.get('/all', auth, admin, getAllProfiles);

module.exports = router;
