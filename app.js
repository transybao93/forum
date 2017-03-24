var config = require(__dirname + '/config/config.js');
var express = require('express');
var logger = require('morgan');
var path = require('path');
var errorHandler = require('errorhandler');
var app = express();
//middleware
app.use(function (req, res) {
    res.status(404).render('404', {title: 'Not Found...'});
  });
//session in express
var session = require('express-session');
app.use(session({secret: 'asdadfjfdiuwhrASDFGHJKLERTYUIOXCVBNMRTYUI123456789!@#$%^&*('}));
//boy-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
//set view engine to pug (Jade template)
app.set('view engine', 'pug');
app.set('views', './views');
app.locals.pretty = true; // indent produces HTML for clarity
//set static folder to public folder
app.set(express.static(__dirname + '/public'));
//socket io
var http = require('http').Server(app);
var io = require('socket.io')(http);
//model
var Post = require(__dirname +'/model/Post.js');
var User = require(__dirname +'/model/User.js');
var Category = require(__dirname +'/model/Category.js');
var Tag = require(__dirname +'/model/Tag.js');

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
// insert some user
// var user = new User({
// 	uName: 'transybao',
//   uEmail: 'transybao28@gmail.com',
//   uPass: 'transybao',
//   registeredAt: new Date(),
// });
// user.save(function(err, data){
// 	if(err)
// 	{
// 		console.log('Errors: ' + err);
// 	}else{
// 		console.log('Insert new user');
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
app.get('/login', function(req, res){
	res.render('login');
});
app.post('/register2', function(req, res){
	// console.log(req.body.uName);
	res.send(req.body.uName);
});
app.get('/post/:id', function(req, res){
	// res.send('id: ' + req.params.id);
	Post.find({'_id': req.params.id}, function(err,data){
		if(err)
		{
			console.log('Error: ' + err);
		}else{
			res.render('post', {'pDetail': data});
		}
	});
	
});


//set port to running apps
// var port = process.env.PORT || 8000;
app.listen(config.server.port, function () {  
    console.log('App running on port 8000!')
});

