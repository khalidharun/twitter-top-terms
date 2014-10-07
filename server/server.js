var options = require('./../config');
var express = require('express');
var app = express();
var port = 9000;

var TopTerms = require('./topterms');
var topTerms = new TopTerms();

app.use(express.static('app'));
app.use(express.static('bower_components'));

app.get('/api/topTerms', function(req, res) {
  res.send(topTerms.getTopTerms());
});

app.get('/api/statuses', function(req, res) {
  res.send(topTerms.getLatestStatuses());
});

app.get('/api/start', function(req, res) {
  console.log('Start Stream');
  topTerms.startStream(options);
  res.status(200).end();
});

app.get('/api/stop', function(req, res) {
  console.log('Stop Stream');
  topTerms.stopStream();
  res.status(200).end();
});

app.get('/api/reset', function(req, res) {
  console.log('Reset');
  topTerms.reset();
  res.status(200).end();
});

app.listen(port);
console.log("Server started listening on http://localhost:"+ port);
