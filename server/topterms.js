var _ = require('underscore'),
 config = require('./config'),
 faker = require('faker'),
 Stream = require('twitter-stream'),
 stopwords = require('stopwords').english,
 events  = require('events'),
 util    = require("util");

var TopTerms = function() {
  this.allTerms = {};
  this.statusBuffer = [];
  this.topTerms = [];

  events.EventEmitter.call(this);
};

// Make TopTerms capable of emitting events
util.inherits(TopTerms, events.EventEmitter);

// Top Terms Logic
TopTerms.prototype.getTopTerms = function() {
  //console.log('returning top terms.');

  var counter = _.pairs(this.allTerms);
  //console.log("Counter", counter);

  var sorted = _.sortBy(counter, function(item) {return -item[1];});
  //console.log("sorted", sorted);

  var topTen = sorted.slice(0,10);
  //console.log("topTen", topTen);

  // return topTen
  return topTen;
}

TopTerms.prototype.getLatestStatuses = function() {
  console.log('returning statuses.');
  var latestStatuses = this.statusBuffer;
  this.statusBuffer = [];
  return latestStatuses;
}

TopTerms.prototype.updateTopTerms = function() {
  var self = this;

  // Sort counter
  var counter = _.pairs(self.allTerms);
  sorted = _.sortBy(counter, function(item) {return item[1];});

  // return topTen
  return sorted.slice(10);

};

var statusCounter = 0;
TopTerms.prototype.processStatus = function(status) {

  console.log(statusCounter++, status);

  var words = status.toLowerCase().match(/[\w]+/g); //.split(/\W/);
  if(!words) return;

  var allTerms = this.allTerms;
  words.forEach( function(item) {

    // skip stop words
    if(_.contains(stopwords, item)) return;

    // increment counter
    allTerms[item] = (allTerms[item]) ? allTerms[item] + 1: 1;
  });

  // Push onto statuses buffer
  this.statusBuffer.push(status);

  //console.log("allTerms", this.allTerms);
}

// Twitter Stream

TopTerms.prototype.startStream = function() {
  console.log('Starting Stream');
  var self = this;
  var counter = 0;
  self.stream = new Stream({
    consumer_key: config.consumer_key,
    consumer_secret: config.consumer_secret,
    access_token_key: config.access_token_key,
    access_token_secret: config.access_token_secret
  });

  var params = {
    locations: '-88,41,-87,42' // Chicagoland area
  };

  var endpoint = 'https://stream.twitter.com/1.1/statuses/filter.json';
  self.stream.stream(params, endpoint);

  self.stream.on('data', function(json) {
    if (!json.hasOwnProperty('text')) return; // Get rid of updates without text
    self.processStatus(json.text);
  });
};

module.exports = TopTerms;