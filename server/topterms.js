var _ = require('underscore'),
 faker = require('faker'),
 Stream = require('twitter-stream'),
 StopWords = require('stopwords'),
 events  = require('events'),
 util    = require("util");

/* 
*  Handle stop words
*  I found an npm package with a list of stop words in English and Spanish.
*  And them I added some of my own.
*/
var customStopWords = ['http', 'https', 'amp', "i'm", "we're", 'lol', "it's", "don't"];
var stopwords = _.union(StopWords.english, StopWords.spanish, customStopWords);


/*
*  TopTerms - Constructor
*/
var TopTerms = function() {
  this.allTerms = {};
  this.statusBuffer = [];
  this.topTerms = [];
};

/*
*  Top Terms Logic
*/

TopTerms.prototype.reset = function() {
  this.allTerms = {};
  this.statusBuffer = [];
  this.topTerms = [];
};

TopTerms.prototype.getTopTerms = function() {
  var counter = _.pairs(this.allTerms);
  var sorted = _.sortBy(counter, function(item) {return -item[1];});
  var topTen = sorted.slice(0,10);
  return topTen;
}

/*
*  Sends latest statuses and then clears the buffer of pending status messages
*/
TopTerms.prototype.getLatestStatuses = function() {
  var latestStatuses = this.statusBuffer;
  this.statusBuffer = [];
  return latestStatuses;
}


/*
*  Sort the counter of allTerms and return an array of the top 10
*/
TopTerms.prototype.updateTopTerms = function() {
  var counter = _.pairs(this.allTerms);
  sorted = _.sortBy(counter, function(item) {return item[1];});
  return sorted.slice(10);

};

var statusCounter = 0;
var statusFilter = /[\w\u00C0-\u04ff']{3,}/g;

TopTerms.prototype.processStatus = function(status) {
 
  // Sanitize and tokenize status message
  status = status.trim();
  console.log(statusCounter++, status);
  var words = status.toLowerCase().match(statusFilter); //.split(/\W/);
 
  if(!words) return;  // return if no suitable words are found.

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



/*
* Twitter Stream Functionality
*
* In order to grab Twitter stream, I forked another npm package 'user-stream', which provides a really nice 
* Twitter stream client with already handled the stream processing through OAuth requests.  The limitation of
* this package is that it was only good for User Streams and not Public Streams.  I made a more generic 
* version of this package that is able to handle any given Twitter stream endpoint at https://github.com/khalidharun/twitter-stream
*
* I'm using the Filter Stream endpoint and limiting my stream based on location.  Some example coordinate blocks are below.
*/

var geoLocations = {
    chicago: '-88,41,-87,42', // Chicago
    chicagoland:  '-90,40,-85,43', // Chicagoland
    us: '-125, 24, -66, 50', // US
    world: '-180,-90,180,90' // Any geotagged tweet
};

/*
*  Start a stream.
*
*  If a stream is not connected, create a new stream with the options, which contain Twitter API keys from config.js file.
*  Then just hook up listeners to processStatus() on new data in the stream.
*/
TopTerms.prototype.startStream = function(options) {
  var self = this;
  var counter = 0;

  if(!self.stream) {
    self.stream = new Stream(options);

    var params = {
      locations: geoLocations['us']
    };

    var endpoint = 'https://stream.twitter.com/1.1/statuses/filter.json';
    self.stream.stream(params, endpoint);
  }

  /*
  *  Display error on twitter-stream
  */
  self.stream.on('error', function(err) {
    console.error('ERROR', err);
  });

  /*
  * When the twitter-stream captures new data form the Public Stream, it is sent to processStatus to update topTerms 
  */
  self.stream.on('data', function(json) {
    if (!json.hasOwnProperty('text')) return; // Get rid of updates without text
    self.processStatus(json.text);
  });
};


/*
*  Stop Stream by removing listeners to 'data' events
*/
TopTerms.prototype.stopStream = function() {
  if( !this.stream) return;

  this.stream.removeAllListeners('data');
};

module.exports = TopTerms;
