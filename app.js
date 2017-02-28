var express = require('express');
// var router = express.Router();
var app = express();
//set view engine to pug (Jade template)
app.set('view engine', 'pug');
app.set('views', './views');
app.locals.pretty = true; // indent produces HTML for clarity
//set static folder to public folder
app.set(express.static('public'));
//socket io
var http = require('http').Server(app);
var io = require('socket.io')(http);
//mongooose
var mongoose = require('mongoose');

//routing with express
app.get('/', function (req, res) {  
    res.render('index');
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

//set port to running apps
var port = process.env.PORT || 8000;
app.listen(port, function () {  
    console.log('App running on port 8000!')
});

