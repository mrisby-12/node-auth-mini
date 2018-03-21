require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');

const strategy = require(`${__dirname}/strategy`);

const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 100000000
    }
}));

app.use( passport.initialize() );
app.use( passport.session() );
passport.use( strategy );

passport.serializeUser((user, done) => {
    return done(null, user);
  });
  
passport.deserializeUser((user, done) => {
    return done(null, user);
  });

app.get('/auth', passport.authenticate('auth0', {
    successRedirect: '/me',
    failureRedirect: '/auth',
    failureFlash: true
}));

app.get('/me', (req, res) => {
    if (!req.user) {
        res.status(401).json({ message: 'Not Authenticated'})
    } else {
        res.status(200).json(req.user)
    }
});




const port = 3001;
app.listen( port, () => { console.log(`Server listening on port ${port}`); } );