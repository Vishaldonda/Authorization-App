const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile, getPublicProfiles, getAllProfiles } = require('../controllers/userController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.route('/profile')
    .get(auth, getUserProfile)
    .put(auth, updateUserProfile);

router.get('/public-profiles', auth, getPublicProfiles);
router.get('/all-profiles', auth, admin, getAllProfiles);

module.exports = router;
