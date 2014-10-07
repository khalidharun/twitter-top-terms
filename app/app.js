var app = angular.module('topTerms', []);

app.controller('TwitterStream', ['$scope', '$http', function($scope, $http) {

  // Initialize statuses locally
  $scope.statuses = [];

  // Fetch statuses from server
  $scope.fetchStatuses = function() {
    $http.get('/api/statuses').then(function(result) {
      // Success
      $scope.statuses = $scope.statuses.concat(result.data);
      //console.log('result.data', result.data);
      //console.log('statuses', $scope.statuses);
    }, function(reason) {
      // Error
      console.error('ERROR', reason);
    });
  }

  // Reset Twitter Stream
  $scope.$on('reset', function() {
    console.log('Reset caught on TwitterStream controller.');
    $scope.statuses = [];
  });

  setInterval($scope.fetchStatuses, 1000);

}]);

app.controller('TopTerms', ['$scope', '$http', function($scope, $http) {
  // Initialize topTerms locally
  $scope.topTerms = [];

  // Fetch top Terms
  $scope.fetchTopTerms = function() {
    $http.get('/api/topTerms').then(function(result) {
      // Success case
      $scope.topTerms = result.data;
    }, function(reason) {
      // Error case
      console.error("ERROR", reason);
    });
  };

  // Poll for update topTerms from server
  setInterval($scope.fetchTopTerms, 1000);

  $scope.$on('reset', function() {
    $scope.topTerms = [];
  });
}]);

app.controller('Timer', ['$scope', '$http', function($scope, $http) {
  $scope.duration = 5*60*1000; // in ms

  $scope.start = function() {
    $http.get('/api/start').then(function(result) {
      // success
      console.log('Stream Started');
      $scope.startTime = Date.now();
      $scope.stopTime = undefined;
      $scope.timeout = setTimeout($scope.stop, $scope.duration);
    }, function(reason) {
      // error
      console.error(reason);
    });
  };

  $scope.stop = function() {
    $http.get('/api/stop').then(function(result) {
      // success
      console.log('Stream Stopped');
      $scope.stopTime = Date.now();
      if($scope.timeout) {
        clearTimeout($scope.timeout);
        $scope.timeout = undefined;
      }
    }, function(reason) {
      console.error(reason);
    });
  };

  $scope.startStop = function() {
    if (!$scope.timeout) {
      $scope.start();
    } else {
      $scope.stop();
    }
  };

  $scope.reset = function() {
    // Stop
    $scope.stop();
    $scope.startTime = undefined;
    $scope.stopTime = undefined;

    // Tell the server to reset
    $http.get('/api/reset').then(function(result) {
      //success
      console.log('reset');
      $scope.$emit('callForReset');
    }, function(reason) {
      // error
      console.error(reason);
    });
  };

  $scope.timeElapsed = function() {
    if(!$scope.startTime) return 0;
    if(!$scope.stopTime)  return (Date.now() - $scope.startTime)/1000;

    return ($scope.stopTime - $scope.startTime) / 1000;
  };

  $scope.reset();
}]);

app.run(function($rootScope) {
  $rootScope.$on('callForReset', function(event, args) {
    console.log('Reset caught on rootScope.');
    $rootScope.$broadcast('reset', args);
  });
});