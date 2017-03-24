var mongoose = require(__dirname +'/../config/db.js');
var Schema = require('mongoose').Schema;

var categorySchema = mongoose.Schema({
  cName: {type: String, required: true},
  cDescription: {type: String, max: 100},
});
var Category = mongoose.model('Category', categorySchema, 'category');
module.exports = Category;