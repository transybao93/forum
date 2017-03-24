var mongoose = require(__dirname +'/../config/db.js');
var Schema = require('mongoose').Schema;

var userSchema = mongoose.Schema({
  uName: {type: String, max: 100, required:true, trim: true},
  uEmail: {type: String, required:true, trim: true},
  uPass: {type: String, max: 100, required:true},
  registeredAt: {type: Date},
  posts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
});

var User = mongoose.model('User', userSchema, 'user');
module.exports = User;