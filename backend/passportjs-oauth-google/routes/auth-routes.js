const router = require('express').Router();
const passport = require('passport');

const CLIENT_URL = 'http://localhost:3000/';

// auth login
router.get('/login/success', (req, res) => {
  if (req.user) {
    res.status(200).send({ msg: 'Successful authentication', user: req.user });
  } else {
    res.status(401).send({ msg: 'Authentication unsuccessful.' });
  }
});

router.get('/login/failed', (req, res) => {
  res.status(401).send({ msg: 'Authentication unsuccessful.' });
});

// auth logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

// auth with google+
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile'],
  }),
);

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: CLIENT_URL,
    failureRedirect: '/login/failed',
  }),
);

//facebook auth
//requires https for CORS
router.get('/facebook', passport.authenticate('facebook'));

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: CLIENT_URL,
    failureRedirect: '/login/failed',
  }),
);

//github auth
router.get('/github', passport.authenticate('github', { scope: ['profile'] }));

router.get(
  '/github/callback',
  passport.authenticate('github', {
    successRedirect: CLIENT_URL,
    failureRedirect: '/login/failed',
  }),
);

module.exports = router;
