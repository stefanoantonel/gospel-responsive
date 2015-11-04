console.log("Running in the Backend!... Port:1337");
var express = require("express");
var parser = require("body-parser");
var fs = require('fs');
var web = express();
var request = require('request');

var server = web.listen(1337, function() {
	console.log("Server just started!");
});
web.use(express.static(path.join(__dirname, 'views/bower_components')));
web.use(parser.urlencoded({extended:false}));

web.get('/daily', function(req, res) {
	request('http://evangeliodeldia.org/M/SP/', function (error, response, body) {
		if (!error && response.statusCode == 200) {

			console.log(body) // Print the body of response.
			res.write(body);
			res.end();
		}
	});
});
web.get('/', function(req, res) {
	res.sendFile('views/index.html' , { root : __dirname});
});