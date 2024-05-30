const express = require('express');
const router = express.Router();
const passport = require('passport');
const { registerUser, loginUser, logoutUser } = require('../controllers/authController');

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Logout route
router.get('/logout', logoutUser);

// GitHub auth route
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// GitHub auth callback
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/'); // Redirect to the desired route after successful authentication
});

module.exports = router;
