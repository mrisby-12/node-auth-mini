const Auth0Strategy = require('passport-auth0');

module.exports = new Auth0Strategy({
    domain:       process.env.DOMAIN,
    clientID:     process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    scope:        'openid profile', 
    callbackURL:  '/auth'
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
      // accessToken is the token to call Auth0 API (not needed in the most cases)
      // extraParams.id_token has the JSON Web Token
      // profile has all the information from the user, where user would be stored in db
      return done(null, profile);
    }
  );

