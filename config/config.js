var mUsername = 'transybao';
var mPassword = 'transybao';
var mDatabase = 'tsbforum';
var mAddress =  'ds161029.mlab.com:61029';
var localAddr = 'mongodb://127.0.0.1:27017/forum';
//uistring
var uristring =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://' + mUsername + ':' + mPassword + '@' + mAddress + '/' + mDatabase;
var PORT = 8000;
var PORT_PRODUCTION = process.env.PORT;

var config = {
	local:{
		server:{
			port: PORT,
		},
		database: {
			url: localAddr,
		},
	},
	production: {
		server:{
			// port: PORT_PRODUCTION,
			port: PORT,
		},
		database: {
			url: uristring,
		},
	},
	
};
module.exports = config[process.env.NODE_ENV] || config.production;