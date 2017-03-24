var mongoose = require(__dirname +'/../config/db.js');
var Schema = require('mongoose').Schema;


var postSchema = mongoose.Schema({
  pTitle: { type: String, trim: true, required: true },
  pContent: { type: String, trim: true, required: true },
  pAuthor: { type: String, trim: true, required: true },
  pViews: {type: Number, default: 0},
  pCreatedAt: {type: Date},
  __userID: {type: String, required:true, ref: 'User'},
  categoryID: {type: String, required: true},
  tags: [{type: Schema.Types.ObjectId, ref: 'Tag'}],
});

var Post = mongoose.model('Post', postSchema, 'post');
module.exports = Post;

