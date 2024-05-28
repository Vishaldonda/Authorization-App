const express = require('express');
const { getPublicProfiles, getUserProfile } = require('../controllers/userController');
const { auth, adminAuth } = require('../middleware/auth');
const router = express.Router();

router.get('/public', getPublicProfiles);
router.get('/:id', auth, getUserProfile);
router.get('/admin/:id', [auth, adminAuth], getUserProfile);

module.exports = router;
