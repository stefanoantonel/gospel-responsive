console.log("Running in the Backend!... Port:1337");
var express = require("express");
var parser = require("body-parser");
var fs = require('fs');
var web = express();
var request = require('request');

var server = web.listen(1337, function() {
	console.log("Server just started!");
});

web.get("/", function() {
	request('http://apple.com', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log(body) // Print the body of response.
		}
	});
});