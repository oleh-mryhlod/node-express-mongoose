'use strict';

/*
 * Module dependencies.
 */

const mongoose = require('mongoose');
const local = require('./passport/local');
const facebook = require('./passport/facebook');

const User = mongoose.model('User');

/**
 * Expose
 */

module.exports = function (passport) {

  // serialize and deserialize sessions
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => User.findOne({ _id: id }, done));

  // use these strategies
  passport.use('local-login', local);
  passport.use(facebook);
};
