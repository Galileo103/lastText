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
var errorCode = "";
var watson = require('watson-developer-cloud');

var conversation = watson.conversation({
  username: '4c2c5c86-0680-4a97-aab6-00421030af5e',
  password: 'SWU0veejaB7D',
  version: 'v1',
  version_date: '2016-09-20'
});

// Replace with the context obtained from the initial request

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
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.get("/syn", function(req, res) {
	globalVar = req.param('txt');
	errorCode = req.param('cod');

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
		res.end(globalVar+":"+errorCode);
		
		globalVar = "";
	}

});


app.post("/conv", function(req, res) {
conversation.message({
  workspace_id: 'd62c761b-c39a-4fef-9832-d93378f64332',
  input: {'text': req.body.input},
  context: req.body.context
},  function(err, response) {
  if (err)
    console.log('error:', err);
  else
    res.json(response);
});
});
app.get("/sync2", function(req, res) {
	
		console.log('else');
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