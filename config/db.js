var mongoose = require('mongoose');
//get data from config file
var config = require('./config.js');


mongoose.connect(config.database.url, function (err, db) {
  if (err) {
    console.log ('ERROR: ' + err);
  } else {
    console.log ('Connected to database !');
  }

});

module.exports = mongoose;