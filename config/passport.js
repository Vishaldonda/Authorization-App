const GitHubStrategy = require('passport-github2').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (passport) => {
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.NODE_ENV === 'production' 
                  ? 'https://my-app.onrender.com/auth/github/callback' 
                  : 'http://localhost:3000/auth/github/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    const newUser = {
      githubId: profile.id,
      displayName: profile.displayName || profile.username,
      username: profile.username,
      profileUrl: profile.profileUrl,
      avatarUrl: profile.photos[0].value,
    };

    try {
      let user = await User.findOne({ githubId: profile.id });

      if (user) {
        done(null, user);
      } else {
        user = await User.create(newUser);
        done(null, user);
      }
    } catch (err) {
      console.error(err);
    }
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};
