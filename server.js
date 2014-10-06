var express = require('express');
var app = express();
var port = 9000;

app.use(express.static('app'));
app.use(express.static('bower_components'));

app.listen(port);
console.log("Server started listening on http://localhost:"+ port);