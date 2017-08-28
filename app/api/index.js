const winston = require('winston');

const Book = require('../models/book');
const User = require('../models/user');

const handleError = (res, onSuccess) => (err, result) => {
  if (err) {
    winston.error(err);
    res.status(500).send('Unknown error');
  } else {
    onSuccess(result);
  }
};

module.exports = function (app, passport) {
  app.route('/api/books')

    .post(function (req, res, next) {
      const bookDoc = req.body;
      const book = new Book(bookDoc);

      book.save(handleError(res, function (result) {
        res.status(200).send(result);
      }));
    })

    .get(function (req, res, next) {
      Book.find({}, handleError(res, function (result) {
        res.status(200).send(result);
      }));
    });


  app.route('/api/books/:_id')
    .get(function (req, res, next) {
      Book.findOne({ _id: req.params._id }, handleError(res, function (result) {
        res.status(200).send(result);
      }));
    });



  app.route('/api/user')
    // .post(function (req, res, next) {
    //   const userDoc = req.body;
    //   const user = new User();
    //
    //
    //   user.facebook.id    = 'profile.id';
    //   user.facebook.token = 'token';
    //   user.facebook.name  = '21';
    //   user.facebook.email = '3';
    //   user.skipValidation = true;
    //   user.save(handleError(res, function (result) {
    //   res.status(200).send(result);
    //   }));
    // })



    .post(function (req, res, next) {
      const userDoc = req.body;
      const user = new User({
          name: userDoc.name,
          email: userDoc.email,
      });
      user.salt = user.makeSalt()
      user.hashed_password = user.encryptPassword(userDoc.password);

      user.save(handleError(res, function (result) {
        res.status(200).send(result);
      }));
    })

    .get(function (req, res, next) {
      User.find({}, handleError(res, function (result) {
        res.status(200).send(result);
      }));
    });

    // app.post('/api/login',
    //   passport.authenticate('local', { successRedirect: '/', failureRedirect: '/api/login' })
    // )
    //
    // app.get('/api/login',
    //   function(req, res) {
    //     res.redirect('/api/books');
    //   }
    // )

  app.route('/api/login')
    .post(
      passport.authenticate('local-login', {failureRedirect: '/api/login', failureFlash: true}),
      function(req, res) {
        res.redirect('/');
      }
    )

    .get(function (req, res, next) {
        res.status(200).send('Log In!')
        // res.redirect('/')
        // res.redirect('/api/books');
    });

  app.get('/auth/facebook', passport.authenticate('facebook'));

  app.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/profile',
			failureRedirect : '/'
		}));

  app.get('/logout', function(req, res) {
  	req.logout();
  	res.redirect('/');
  });
};
