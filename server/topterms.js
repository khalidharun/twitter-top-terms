var _ = require('underscore'),
 faker = require('faker'),
 Stream = require('twitter-stream'),
 StopWords = require('stopwords'),
 events  = require('events'),
 util    = require("util");

// additional stopwords
var customStopWords = ['http', 'https', 'amp', "i'm", "we're", 'lol', "it's", "don't"];
var stopwords = _.union(StopWords.english, StopWords.spanish, customStopWords);

var TopTerms = function() {
  this.allTerms = {};
  this.statusBuffer = [];
  this.topTerms = [];

//  events.EventEmitter.call(this);
};

TopTerms.prototype.reset = function() {
  this.allTerms = {};
  this.statusBuffer = [];
  this.topTerms = [];
};

// Make TopTerms capable of emitting events
//util.inherits(TopTerms, events.EventEmitter);

// Top Terms Logic
TopTerms.prototype.getTopTerms = function() {
  var counter = _.pairs(this.allTerms);
  var sorted = _.sortBy(counter, function(item) {return -item[1];});
  var topTen = sorted.slice(0,10);
  return topTen;
}

TopTerms.prototype.getLatestStatuses = function() {
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
var statusFilter = /[\w\u00C0-\u04ff']{3,}/g;
TopTerms.prototype.processStatus = function(status) {
  status = status.trim();
  console.log(statusCounter++, status);
  var words = status.toLowerCase().match(statusFilter); //.split(/\W/);
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
}

// Twitter Stream

TopTerms.prototype.startStream = function(options) {
  var self = this;
  var counter = 0;

  if(!self.stream) {
    self.stream = new Stream(options);

    var params = {
      //locations: '-88,41,-87,42' // Chicago
      //locations: '-90,40,-85,43' // Chicagoland
      //locations: '-125, 24, -66, 50' // US
      locations: '-180,-90,180,90' // Any geotagged tweet
    };

    var endpoint = 'https://stream.twitter.com/1.1/statuses/filter.json';
    self.stream.stream(params, endpoint);
  }

  self.stream.on('error', function(err) {
    console.error('ERROR', err);
  });

  self.stream.on('data', function(json) {
    if (!json.hasOwnProperty('text')) return; // Get rid of updates without text
    self.processStatus(json.text);
  });
};

TopTerms.prototype.stopStream = function() {
  if( !this.stream) return;

  this.stream.removeAllListeners('data');
};

module.exports = TopTerms;