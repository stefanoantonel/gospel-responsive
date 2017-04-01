#!/bin/env node
//  OpenShift sample Node application
var request = require('request');
// var Xray 	= require('x-ray');
var favicon = require('serve-favicon');
// var x 		= Xray();
var express = require('express');
var app 	= express();
var parseString = require('xml2js').parseString;
var cheerio = require('cheerio');

app.set('port', process.env.PORT || 443);
var port = app.get('port');
console.log('Port found', app.get('port'));

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
	console.log('listening on '+ port);
	refresh();
});

var refresh = function() {
	getContent()
	.then(function(response) {
		Gospel.gospel = response.gospel;
		Gospel.reflexion = response.reflexion;
	})
}

var getContent = function() {
	/* return {gospel: .., reflexion: ..} */
	return new Promise(function(resolve, reject) {
		var url = 'http://feeds.feedburner.com/mdc-misionerosdigitales';
		var text = '';
		var g = {gospel: null, reflexion: null};
		request(url, function(err, resp, body) {
			if(err) {
				reject(err)
			} else {
				parseString(body, function (err, result) {
					var items = result.rss.channel["0"].item;
					var itemsNumber = items.length;
					var i=0;
					var found = false;
					while(i < itemsNumber && !found) {
						var html = items[i]["content:encoded"][0];
						$ = cheerio.load(html);
						var isEvangelium = $("h2:contains('Evangelio según San')");
						if(isEvangelium[0]) {
							title = $('h2')[0];
							text = $(title).text();
							var start = $('h2')[0];
							var end = $('h2')[1];
							$(start).nextUntil(end).each(function(i, elem) {
								text += $(elem).text();
							});
							var reflexion = $('audio').toArray()[0];
							$(reflexion).text();
							g.reflexion = $(reflexion).text();
							g.gospel = text;
							found = true;
						}
						i++;
					}
				});
				resolve(g);
			}
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