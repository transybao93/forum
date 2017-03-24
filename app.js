var config = require(__dirname + '/config/config.js');
var express = require('express');
var logger = require('morgan');
var path = require('path');
var errorHandler = require('errorhandler');
var datetime = require('easydate');
var app = express();
app = require('./route.js');
//using morgan
app.use(logger('dev'));
//session in express
var session = require('express-session');
app.use(session({secret: 'asdadfjfdiuwhrASDFGHJKLERTYUIOXCVBNMRTYUI123456789!@#$%^&*('}));
//boy-parser
// var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({
//     extended: true
// }));
// app.use(bodyParser.json());
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
// var Post = require(__dirname +'/model/Post.js');
var User = require(__dirname +'/model/User.js');
var Category = require(__dirname +'/model/Category.js');
var Tag = require(__dirname +'/model/Tag.js');


//controllers
// var POST = require(__dirname + '/controller/postController');

//routing with express
// app.get('/', function (req, res) {  

// 		POST.showAll(res);
    
// });
// app.get('/about/:author', function(req, res){
// 	res.render('about', {authorName: req.params.author});
// });
// app.get('/tag', function(req, res){
// 	res.render('tag');
// });
// app.get('/user', function(req, res){
// 	res.render('user');
// });
// app.get('/register', function(req, res){
// 	res.render('register');
// });
// app.get('/login', function(req, res){
// 	res.render('login');
// });
// app.post('/register2', function(req, res){
// 	var email = req.body.email;
// 	var username = req.body.uName;
// 	var password = req.body.pass;

// 	res.send("Username: " + username + " - Email: " + email);
// });
// app.get('/post/:id', function(req, res){
// 	POST.showByID(res,req.params.id);
// });





//set port to running apps
// var port = process.env.PORT || 8000;
app.listen(config.server.port, function () {  
    console.log('App running on port 8000!')
});

