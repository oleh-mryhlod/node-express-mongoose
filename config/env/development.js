
/**
 * Expose
 */

module.exports = {
  db: 'mongodb://localhost/your_project_development',
  facebook: {
    clientID: '674568832732533',
    clientSecret: '5285f671af275df3dcf0dcb588819dcd',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    scope: [
      'email',
      'user_about_me',
      'user_friends'
    ]
  },
  google: {
    clientID: 'APP_ID',
    clientSecret: 'SECRET',
    callbackURL: 'http://localhost:3000/auth/google/callback',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.google.com/m8/feeds',
    ]
  }
};
