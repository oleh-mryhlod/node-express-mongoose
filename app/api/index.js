const winston = require('winston');

const Book = require('../models/book');


const handleError = (res, onSuccess) => (err, result) => {
  if (err) {
    winston.error(err);
    res.status(500).send('Unknown error');
  } else {
    onSuccess(result);
  }
};

module.exports = function (app) {
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
};
