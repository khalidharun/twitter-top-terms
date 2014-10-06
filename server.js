var express = require('express');
var app = express();
var port = 9000;

var dummyData = {
  statuses: [
    'hello there',
    'I think',
    'We have something here'
  ],
  topTerms: [
    {
      name: 'hello server',
      count: 50
    },
    {
      name: 'there',
      count: 30
    },
    {
      name: 'buddy',
      count: 20
    }
  ]
};

app.use(express.static('app'));
app.use(express.static('bower_components'));

app.get('/api/topTerms', function(req, res) {

  // Send dummyData
  res.send(dummyData.topTerms);
});

app.get('/api/statuses', function(req, res) {
  // Send dummyData
  res.send(dummyData.statuses);
});


app.listen(port);
console.log("Server started listening on http://localhost:"+ port);