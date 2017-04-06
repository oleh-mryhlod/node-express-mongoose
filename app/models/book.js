var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var BookSchema = new Schema({
  name: { type: String, default: '' },
  releaseYear: { type: Number, default: 1900 },
});

module.exports = mongoose.model('Book', BookSchema);
