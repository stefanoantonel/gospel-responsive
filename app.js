console.log("Running in the Backend!... Port:1337");
var express = require("express");
var parser = require("body-parser");
var fs = require('fs');
var web = express();
var request = require('request');
var Xray = require('x-ray');
var x = Xray()

var server = web.listen(1337, function() {
	console.log("Server just started!");
});

web.set('view engine', 'jade');

/*
web.get('/daily', function(req, res) {
		request('http://www.ciudadredonda.org/calendario-lecturas/evangelio-del-dia/hoy', function (error, response, body) {
			//console.log(response);
			//console.log(body);
			res.write(body);
			res.end();
		});

	x('http://www.ciudadredonda.org/calendario-lecturas/evangelio-del-dia/hoy', ['div.texto_palabra'])(function(err, parts) {
			var gospel = parts[parts.length -1];

			//res.set({ 'content-type': 'application/json; charset=utf-8' });
			res.write(gospel);
			res.end();
	}); 
});
*/

web.get('/', function (req, res) {
	x('http://www.ciudadredonda.org/calendario-lecturas/evangelio-del-dia/hoy', ['div.texto_palabra']) 
		(function(err, parts) {
			var gospel = parts[parts.length -1];
			res.render('index', { title: 'Gospel', message: gospel});
		});
});

/*
web.get('/', function(req, res) {
	res.sendFile('views/index2.html' , { root : __dirname});
});
*/