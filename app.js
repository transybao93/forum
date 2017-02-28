var express = require('express');
// var router = express.Router();
var app = express();
//set view engine to pug (Jade template)
app.set('view engine', 'pug');
app.set('views', './views');
app.locals.pretty = true; // indent produces HTML for clarity
//set static folder to public folder
app.set(express.static(__dirname + '/public'));
//socket io
var http = require('http').Server(app);
var io = require('socket.io')(http);
//mongooose
var mongoose = require('mongoose');
var mUsername = 'transybao';
var mPassword = 'transybao';
var mDatabase = 'tsbforum';
var mAddress =  'ds161029.mlab.com:61029';
var mTempAddress = 'mongodb://127.0.0.1:27017/forum';
//uistring
 var uristring =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://' + mUsername + ':' + mPassword + '@' + mAddress + '/' + mDatabase;
    // var app = '--app tsbforum';
//check connection
mongoose.connect(mTempAddress, function (err, db) {
  if (err) {
    console.log ('ERROR: ' + err);
  } else {
    console.log ('Connected to database !');
  }

});

/**
 * Mongoose Schema
 */
var postSchema = mongoose.Schema({
  pTitle: { type: String, trim: true, required: true },
  pContent: { type: String, trim: true, required: true },
  pAuthor: { type: String, trim: true, required: true },
  pViews: {type: Number, default: 0},
  pTags: {type: String},
  pCreatedAt: {type: Date},
  userID: {type: Number, required:true},
  categoryID: {type: Number, required: true},
});
var userSchema = mongoose.Schema({
  uName: {type: String, max: 100, required:true, trim: true},
  uEmail: {type: String, required:true, trim: true},
  uPass: {type: String, max: 100, required:true},
  registeredAt: {type: Date},
});
var categorySchema = mongoose.Schema({
  cName: {type: String, required: true},
  cDescription: {type: String, max: 100},
});
var tagSchema = mongoose.Schema({
  tName: {type: String},
  tDescription: {type: String},
});
var Post = mongoose.model('Post', postSchema, 'post');
var User = mongoose.model('User', userSchema, 'user');
var Category = mongoose.model('Category', categorySchema, 'category');
var Tag = mongoose.model('Tag', tagSchema, 'tag');
// module.exports = Post;
// module.exports = User;
// module.exports = Category;
// module.exports = Tag;

//insert some data
// var post = Post({
//   pTitle: 'Post sample',
//   pContent: 'Post sample',
//   pAuthor: 'Tran Sy Bao',
//   pViews: 2,
//   pTags: 'post,sample',
//   pCreatedAt: new Date(),
//   userID: 1,
//   categoryID: 1,
// });
// post.save(function(err, posts){
// 	if(err)
// 	{
// 		console.log('Error(s): ' + err);
// 	}else{
// 		console.log('Created new data !');
// 	}
// });
// var cate = Category({
//   cName: 'Nodejs',
//   cDescription: 'All questions about Nodejs',
// });
// cate.save(function(err, cates){
// 	if(err)
// 	{
// 		console.log('Error(s): ' + err);
// 	}else{
// 		console.log('Created new category !');
// 	}
// });

//routing with express
app.get('/', function (req, res) {  
		//connect to database
		Post.find(function(err, data){
			if(err)
			{
				console.log('Error(s): ' + err);
			}else{
				res.render('index', {pList: data});
			}
		});
    
});
app.get('/about/:author', function(req, res){
	res.render('about', {authorName: req.params.author});
});
app.get('/tag', function(req, res){
	res.render('tag');
});
app.get('/user', function(req, res){
	res.render('user');
});
app.get('/register', function(req, res){
	res.render('register');
});

//set port to running apps
var port = process.env.PORT || 8000;
app.listen(port, function () {  
    console.log('App running on port 8000!')
});

