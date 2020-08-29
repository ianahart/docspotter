const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config({ path: './config.env' });

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  if (!id) {
    console.log('hihihihihihihihi');
  }
  User.findById(id)
    .then((user) => {
      done(null, user.id);
    })
    .catch((err) => console.log(err.message));
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/redirect',
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
          console.log('user is ', currentUser);
          done(null, currentUser);
        } else {
          new User({
            username: profile.displayName,
            googleId: profile.id,
          })
            .save()
            .then((newUser) => {
              console.log('new user created ' + newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);
