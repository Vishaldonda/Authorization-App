const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile, getPublicProfiles, getAllProfiles } = require('../controllers/userController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Get current user's profile
router.get('/profile', auth, getUserProfile);

// Update current user's profile
router.put('/profile', auth, updateUserProfile);

// Get all public profiles
router.get('/public', getPublicProfiles);

// Admin route to get all profiles
router.get('/all', auth, admin, getAllProfiles);

module.exports = router;
