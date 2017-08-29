
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var User = mongoose.model('User');

/**
 * Expose
 */

module.exports = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback : true
  },
  function (req, email, password, done) {
    var options = {
      criteria: { email: email }
    };

    User.load(options, function (err, user) {
      if (err) { return done(err);}
      if (user) {
        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
      }
      if(req.user){
        const user = req.user;
        user.email = email;
        user.salt = user.makeSalt()
        user.hashed_password = user.encryptPassword(password);
        user.name = req.body.name;

        user.save(function(err){
          if(err) throw err;
          return done(null, user)
        })
      }
      else {
        const user = new User();
        user.email = email;
        user.name = req.body.name;
        user.salt = user.makeSalt()
        user.hashed_password = user.encryptPassword(password);

        user.save(function(err){
          if(err) throw err;
          return done(null, user)
        })
      }
    });
  }
);
