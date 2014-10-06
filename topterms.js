var _ = require('underscore');
var faker = require('faker');

var TopTerms = function() {
  this.allTerms = {};
  this.statuses = [];
  this.topTerms = [];
};

TopTerms.prototype.getTopTerms = function() {
  console.log('returning top terms.');
  var dummy = _.map(_.range(10), function(item) {
    return [faker.hacker.noun(), item];
  });
  return dummy;
}

TopTerms.prototype.getLatestStatuses = function() {
  console.log('returning statuses.');
  var dummy = _.map(_.range(10), function(item) {
    return faker.lorem.sentence();
  });
  return dummy;
}

TopTerms.prototype.updateTopTerms = function() {
  var self = this;

  // Sort counter
  var counter = _.pairs(self.allTerms);
  sorted = _.sortBy(counter, function(item) {return item[1];});

  // return topTen
  return sorted.slice(10);
};

module.exports = new TopTerms();