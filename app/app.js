var app = angular.module('topTerms', []);

app.controller('TwitterStream', ['$scope', '$http', function($scope, $http) {

  // Initialize statuses locally
  $scope.statuses = [];

  // Initialize topTerms from server
  $http.get('/api/statuses').then(function(result) {
    // Success
    $scope.statuses = result.data;
  }, function(reason) {
    // Error
    console.error('ERROR', reason);
  });

}]);

app.controller('TopTerms', ['$scope', '$http', function($scope, $http) {
  // Initialize topTerms locally
  $scope.topTerms = [];

  // Initialize topTerms from server
  $http.get('/api/topTerms').then(function(result) {
    // Success case
    $scope.topTerms = result.data;
  }, function(reason) {
    // Error case
    console.error("ERROR", reason);
  });

}]);