var mongoose = require('mongoose');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = mongoose.model('User');
const config = require('../');

module.exports = new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL,
    scope: config.facebook.scope,
    passReqToCallback : true
  },

  function(req, token, refreshToken, profile, done) {
                 console.log(profile)
     // asynchronous
     process.nextTick(function() {
       if(!req.user){
         User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
             if (err)
                 return done(err);

             if (user) {
               if (!user.facebook.token) {
                   user.facebook.token = token;
                   user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                   user.facebook.email = profile.emails[0].value;
                   user.skipValidation = true;
                   user.save(function(err) {
                     if (err)
                       throw err;
                       return done(null, user);
                     });
                }
                return done(null, user);
             } else {
                 var newUser            = new User();
                 newUser.facebook.id    = profile.id;
                 newUser.facebook.token = token;
                 newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                 newUser.facebook.email = profile.email;
                 user.skipValidation = true;
                 newUser.save(function(err) {
                     if (err) throw err;

                     return done(null, newUser);
                 });
             }

         });
       }

       else {
        var user = req.user;

        user.facebook.id    = profile.id;
        user.facebook.token = token;
        user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
        user.facebook.email = profile.email;
        user.skipValidation = true;
        user.save(function(err) {
          if (err)
            throw err;
          return done(null, user);
        });
       }

     });
});
