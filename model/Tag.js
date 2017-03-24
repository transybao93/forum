var mongoose = require(__dirname +'/../config/db.js');
var Schema = require('mongoose').Schema;

var tagSchema = mongoose.Schema({
  tName: {type: String},
  tDescription: {type: String},
  __postID: {type: String, ref:'Post'},
});
var Tag = mongoose.model('Tag', tagSchema, 'tag');
module.exports = Tag;