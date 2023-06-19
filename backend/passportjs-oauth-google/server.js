const express = require('express');
const cookieSession = require('cookie-session');
const cors = require('cors');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');

const PORT = 5000;
const app = express();

//setup cors policy
const whitelist = ['http://localhost:3000'];
app.use(cors({ origin: whitelist, credentials: true }));

// set up session cookies
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey],
  }),
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database.'));

// set up routes
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`app now listening for requests on port ${PORT}`);
});
