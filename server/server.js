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

app.listen(port);
console.log("Server started listening on http://localhost:"+ port);

topTerms.startStream();
