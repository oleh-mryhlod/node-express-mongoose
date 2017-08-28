var mongoose = require('mongoose');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = mongoose.model('User');
const config = require('../');

module.exports = new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL
    // scope: config.facebook.scope
  },

  function(token, refreshToken, profile, done) {

     // asynchronous
     process.nextTick(function() {

         User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
             if (err)
                 return done(err);

             if (user) {
                 return done(null, user);
             } else {
                 var newUser            = new User();

                 newUser.facebook.id    = profile.id;
                 newUser.facebook.token = token;
                 newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                 newUser.facebook.email = profile.emails[0].value;

                 newUser.save(function(err) {
                     if (err) throw err;

                     return done(null, newUser);
                 });
             }

         });
     });
});
