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

    .post(isLoggedIn, function (req, res, next) {
      const bookDoc = req.body;
      const book = new Book(bookDoc);

      book.save(handleError(res, function (result) {
        res.status(200).send(result);
      }));
    })

    .get(isLoggedIn, function (req, res, next) {
      Book.find({}, handleError(res, function (result) {
        res.status(200).send(result);
      }));
    });


  app.route('/api/books/:_id')
    .get(isLoggedIn, function (req, res, next) {
      Book.findOne({ _id: req.params._id }, handleError(res, function (result) {
        res.status(200).send(result);
      }));
    });



  app.get('/api/users', function(req, res){
    User.find({}, handleError(res, function (result) {
      res.status(200).send(result);
    }));
  })


  app.route('/api/singup')

    .post(function (req, res, next) {
      passport.authenticate('local-signup', {failureRedirect: '/api/signup', failureFlash: true}),
      function(req, res) {
        res.redirect('/');
      }
      // const userDoc = req.body;
      // const user = new User({
      //     name: userDoc.name,
      //     email: userDoc.email,
      // });
      // user.salt = user.makeSalt()
      // user.hashed_password = user.encryptPassword(userDoc.password);
      //
      // user.save(handleError(res, function (result) {
      //   res.status(200).send(result);
      // }));
    })

    .get(function (req, res, next) {
      res.status(200).send('Sing Up');
      // User.find({}, handleError(res, function (result) {
      //   res.status(200).send(result);
      // }));
    });


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
			successRedirect : '/',
			failureRedirect : '/api/login'
		}));

  app.get('/api/logout', function(req, res) {
  	req.logout();
  	res.redirect('/');
  });


  app.get('/connect/local', function(req, res) {
    res.render('connect-local.jade');
  });
  app.post('/connect/local', passport.authenticate('local-signup', {
    successRedirect : '/',
    failureRedirect : '/connect/local',
    failureFlash : true
  }));


  app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

	app.get('/connect/facebook/callback',
		passport.authorize('facebook', {
			successRedirect : '/api/books',
			failureRedirect : '/'
		}));



  app.get('/unlink/local', function(req, res) {
		var user            = req.user;
		user.email    = undefined;
		user.password = undefined;
    user.skipValidation = true;
		user.save(function(err) {
			res.redirect('/');
		});
	});

  	// facebook -------------------------------
	app.get('/unlink/facebook', function(req, res) {
		var user            = req.user;
		user.facebook.token = undefined;
    user.skipValidation = true;
		user.save(function(err) {
			res.redirect('/');
		});
	});



};






function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/api/login');
}
