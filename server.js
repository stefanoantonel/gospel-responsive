#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var fs      = require('fs');
var request = require('request');
var Xray = require('x-ray');
var favicon = require('serve-favicon');
var x = Xray()
var path = require('path');
var Gospel = {
    text: ''
}

var express = require("express");
var parser = require("body-parser");
var fs = require('fs');
var web = express();
var request = require('request');
var port = 8080;

var app = express();
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static('public'));
app.set('view engine', 'jade');

var server = app.listen(port, function() {
	console.log("Server just started in port: " + port);
});


app.get("/", function(req, res) {
	res.render('index', { 
		title: 'Gospel', 
		message: "Loading..."
	});
});


app.get('/getGospel', function(req, res) {
	x('http://www.ciudadredonda.org/calendario-lecturas/evangelio-del-dia/hoy', ['div.texto_palabra']) 
	(function(err, parts) {
		var text = parts[parts.length -1];
		Gospel.text = text;
		res.send(Gospel.text);
	});
});
