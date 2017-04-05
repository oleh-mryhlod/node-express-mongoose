const Book = require('../models/book');

module.exports = {
  create: function (req, res, next) {
    console.log('req.params', req.params);
    res.status(200).send('success');
  },

  list: function (req, res, next) {
    console.log('req.params', req.params);

    const book = new Book({
      name: 'Test 1 ',
      releaseYear: 2000,
    });

    book.save(function (err, result) {
      res.status(200).send(result);
    });
  },

  details: function (req, res, next) {
    console.log('req.params', req.params);
    res.status(200).send('success');
  },
};