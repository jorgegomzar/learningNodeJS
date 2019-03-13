const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

// Local User Model
const User = require('../models/User');

module.exports = function(passport){
  passport.use(new LocalStrategy( { usernameField: 'email' } , (email, password, done) => {
      User.findOne({ email: email })
        .then( (err, user) => {
          if (err) { return done(err); }
          if (!user) { return done(null, false); }
          if (!user.verifyPassword(password)) { return done(null, false); }
          return done(null, user);
        })
        .catch(err => console.log(err));
    }
  ));
};
