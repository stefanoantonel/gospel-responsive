#!/bin/env node
//  OpenShift sample Node application
var request = require('request');
var Xray 	= require('x-ray');
var favicon = require('serve-favicon');
var x 		= Xray();
var express = require('express');
var app 	= express();
var parseString = require('xml2js').parseString;
var port 	= 8080;

var Gospel 	= {
	"gospel": null,
	"reflexion": null
}

app.set('view engine', 'jade');
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static('public'));

app.get('/', function (req, res) {
	res.render('index', { 
		title: 'Evangelio', 
		gospel: Gospel.gospel,
		reflexion: Gospel.reflexion
	});
});

app.listen(port, function(){
	console.log('listening on '+port);
	refresh();
});



app.get("/", function(req, res) {
	res.render('index2', { 
        title: 'Gospel', 
        message: "Loading...232323232"
    });
});

/*
app.get('/getGospel', function(req, res) {
	x('http://www.ciudadredonda.org/calendario-lecturas/evangelio-del-dia/hoy', ['div.texto_palabra']) 
	(function(err, parts) {
		var text = parts[parts.length -1];
		res.send(text);
	});
});

app.get('/getReflexion', function(req, res) {
	var parseString = require('xml2js').parseString;
	return new Promise(function(resolve, reject) { 
		request('http://feeds.feedburner.com/PbroLuisZazano', function (error, response, body) {
		    if (!error && response.statusCode == 200) {
		        var xml = body;
				parseString(xml, function (err, result) {
				    console.log("--------------");
			    	var reflexion = result.rss.channel["0"].item["0"]["content:encoded"]["0"];
					res.send(reflexion)
					resolve();
				});
		    }
		    reject();
		}); 
	});
});
*/

var refresh = function() {
	getGospel()
	.then(function(text) {
		Gospel.gospel = text;
		return getReflexion();
	}).then(function(text) {
		Gospel.reflexion = text;
	});
}

var getGospel = function() {
	return new Promise(function(resolve, reject) {
		var url = 'http://www.ciudadredonda.org/calendario-lecturas/evangelio-del-dia/hoy';
		x(url, ['div.texto_palabra']) 
		(function(err, parts) {
			if(!err) {
				var text = parts[parts.length -1];
				console.log("gospel ready")
				resolve(text);	
			}
			reject();
		});	
	});
}

var getReflexion = function() {
	return new Promise(function(resolve, reject) {
		request('http://feeds.feedburner.com/PbroLuisZazano', function (error, response, body) {
		    if (!error && response.statusCode == 200) {
		        var xml = body;
				parseString(xml, function (err, result) {
			    	var reflexion = result.rss.channel["0"].item["0"]["content:encoded"]["0"];
			    	console.log("reflexion ready")
					resolve(reflexion);
				});
		    }
		    reject();
		});
	});
}

var CronJob = require('cron').CronJob;
var job = new CronJob('00 30 08 * * *', function() {
  /*
   * Runs every weekday (Monday through Friday)
   * at 11:30:00 AM. It does not run on Saturday
   * or Sunday.
   */
   refresh();
}, 
null,
true, /* Start the job right now */
'America/Los_Angeles' /* Time zone of this job. */
);