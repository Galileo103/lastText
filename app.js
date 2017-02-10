/*eslint-env node*/
//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------
// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

var globalVar = "";

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();
var TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
var fs = require('fs');
var text_to_speech = new TextToSpeechV1({
	username: '3a46e443-601f-4f08-9b2a-c861cdee2508',
	password: 'EbfzWZeQmwaS'
});

var bodyParser = require('body-parser');
var options = {
	inflate: true,
	limit: '100kb',
	type: 'application/octet-stream'
};
app.use(bodyParser.raw(options));
app.get("/syn", function(req, res) {
	// req.body is a Buffer object

	/*var params = {
	    text: req.param('txt'),
	    voice: 'en-US_AllisonVoice',
	    accept: 'audio/wav'
	};*/
	globalVar = req.param('txt');
	res.send('DONE');

});
// Pipe the synthesized text to a file.

app.get("/check", function(req, res) {
	console.log('Checking');

	if (globalVar === '') {
		res.writeHead(200, {
			'Cache-Control': 'no-cache'
		});
		res.end('Empty');
		console.log('empty');
	} else {
		console.log('else');
		res.writeHead(200, {
			'Cache-Control': 'no-cache'
		});
		res.end(globalVar);

		// req.body is a Buffer object
		/*var params = {
		    text: globalVar,
		    voice: 'en-US_AllisonVoice',
		    accept: 'audio/wav'
		};
		text_to_speech.synthesize(params).on('error', function(error) {
		    console.log('Error:', error);
		}).pipe(res); */

		globalVar = "";
	}

});


app.get("/sync2", function(req, res) {
	
		console.log('else');
		/*res.writeHead(200, {
			'Cache-Control': 'no-cache'
		});
		res.end(globalVar);*/

		// req.body is a Buffer object
		var params = {
		    text: req.param('txt'),
		    voice: 'en-US_AllisonVoice',
		    accept: 'audio/wav'
		};
		text_to_speech.synthesize(params).on('error', function(error) {
		    console.log('Error:', error);
		}).pipe(res); 

	

});



// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
	// print a message when the server starts listening
	console.log("server starting on " + appEnv.url);
});