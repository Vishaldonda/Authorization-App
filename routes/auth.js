const express = require('express');
const passport = require('passport');
const router = express.Router();

// @desc    Auth with GitHub
// @route   GET /auth/github
router.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }));

// @desc    GitHub auth callback
// @route   GET /auth/github/callback
router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication
    res.redirect('/dashboard');
  }
);

// @desc    Logout user
// @route   /auth/logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
