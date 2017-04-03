var express = require('express');
var app = express();
var POST = require(__dirname + '/controller/postController');
var bodyParser = require('body-parser');
var logger = require('morgan');
var passport = require('passport');

//middleware
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(logger('dev'));

//routing with express
app.get('/', function (req, res) {  
	// res.render('about');
	POST.showAll(res);
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
	var email = req.body.email;
	var username = req.body.uName;
	var password = req.body.pass;

	res.send("Username: " + username + " - Email: " + email);
});
app.get('/post/:id', function(req, res){
	POST.showByID(res,req.params.id);
});

//new post route
app.get('/newP', function(req, res){
	res.render('newPost');
});
//get data from user interface
app.post('/createPost', function(req, res){
	var title = req.body.pTitle;
	var content = req.body.pContent;
	
	res.send('title: ' + title);
});


module.exports = app;