
/*!
 * Module dependencies
 */

var mongoose = require('mongoose');
var userPlugin = require('mongoose-user');
var Schema = mongoose.Schema;
/**
 * User schema
 */

var UserSchema = new Schema({
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  hashed_password: { type: String, default: '' },
  salt: { type: String, default: '' },

  facebook: {
    id: { type: String, default: '' },
    token: { type: String, default: '' },
    email: { type: String, default: '' },
    name: { type: String, default: '' }
  },
  twitter: {
    id: { type: String, default: '' },
    token: { type: String, default: '' },
    displayName: { type: String, default: '' },
    username: { type: String, default: '' }
  },
  google: {
    id: { type: String, default: '' },
    token: { type: String, default: '' },
    email: { type: String, default: '' },
    name: { type: String, default: '' }
  }
});

/**
 * User plugin
 */

UserSchema.plugin(userPlugin, {});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */

UserSchema.method({

});

/**
 * Statics
 */

UserSchema.static({

});

/**
 * Register
 */

module.exports = mongoose.model('User', UserSchema);
