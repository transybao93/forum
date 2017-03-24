var mongoose = require('mongoose');
var Post = require(__dirname +'/../model/Post.js');

exports.showByID = function(res, id){
	Post.find({'_id': id}, function(err,data){
		if(err)
		{
			console.log('Error: ' + err);
		}else{
			res.render('post', {'pDetail': data});
		}
	});
};

exports.showAll = function(res){
	Post.find(function(err, data){
			if(err)
			{
				console.log('Error(s): ' + err);
			}else{
				res.render('index', {pList: data});
			}
		});
}
