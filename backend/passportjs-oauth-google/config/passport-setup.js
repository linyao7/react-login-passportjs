const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require('passport-github2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  done(null, id);
  User.findById(id).then((user) => {
    //attach user object to req in app.get('/', (req,res) => ...)
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      // options for google strategy
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      // check if user already exists in our own db
      User.findOne({ id: profile.id }).then((currentUser) => {
        if (currentUser) {
          // already have this user
          console.log('user is: ', currentUser);
          done(null, currentUser);
        } else {
          // if not, create user in our db
          console.log('profile: ', profile);
          new User({
            id: profile.id,
            accountType: 'Google',
            username: profile.displayName,
            thumbnail: profile._json.image && profile._json.image.url,
          })
            .save()
            .then((newUser) => {
              console.log('created new user: ', newUser);
              done(null, newUser);
            });
        }
      });
    },
  ),
);

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebook.clientID,
      clientSecret: keys.facebook.clientSecret,
      callbackURL: '/auth/facebook/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      console.log('facebook profile: ', profile);
      User.findOne({ id: profile.id }).then((currentUser) => {
        if (currentUser) {
          done(null, currentUser);
        } else {
          new User({
            id: profile.id,
            accountType: 'Facebook',
            username: profile.displayName,
          })
            .save()
            .then((newUser) => {
              console.log('created new user: ', newUser);
              done(null, newUser);
            });
        }
      });
    },
  ),
);

passport.use(
  new GithubStrategy(
    {
      clientID: keys.github.clientID,
      clientSecret: keys.github.clientSecret,
      callbackURL: '/auth/github/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      console.log('github profile: ', profile);
      User.findOne({ id: profile.id }).then((currentUser) => {
        if (currentUser) {
          done(null, currentUser);
        } else {
          new User({
            id: profile.id,
            accountType: 'Github',
            username: profile.displayName,
          })
            .save()
            .then((newUser) => {
              console.log('created new user: ', newUser);
              done(null, newUser);
            });
        }
      });
    },
  ),
);
