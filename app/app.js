var app = angular.module('app', []);

/*
*  TwitterStream Controller - fetches and display latest statuses 
*     that have came through the stream 
*/
app.controller('TwitterStream', ['$scope', '$http', function($scope, $http) {

  $scope.statuses = []; // List of fetched Twitter status messages

  /*
  *  Fetch statuses from server
  */
  $scope.fetchStatuses = function() {
    $http.get('/api/statuses').then(function(result) {
      // Success
      $scope.statuses = $scope.statuses.concat(result.data);
    }, function(reason) {
      // Error
      console.error('ERROR', reason);
    });
  }

  /*
  *  Reset Twitter Stream
  */
  $scope.$on('reset', function() {
    console.log('Reset caught on TwitterStream controller.');
    $scope.statuses = [];
  });

  // Poll server every 1 second to get latest status
  setInterval($scope.fetchStatuses, 1000);

}]);

/*
* TopTerms Controller - fetches and displays a running total of the top terms 
*  from the time the stream was stated 
*/
app.controller('TopTerms', ['$scope', '$http', function($scope, $http) {
  
  $scope.topTerms = [];

  /*
  *  Fetch top Terms
  */
  $scope.fetchTopTerms = function() {
    $http.get('/api/topTerms').then(function(result) {
      // Success case
      $scope.topTerms = result.data;
    }, function(reason) {
      // Error case
      console.error("ERROR", reason);
    });
  };

  /*
  *  Poll for update topTerms from server
  */
  setInterval($scope.fetchTopTerms, 1000);

  /*
  * Handle reset event from Timer controller
  */
  $scope.$on('reset', function() {
    $scope.topTerms = [];
  });
}]);


/*  
*   Time Controller - Starts/Stops/Resets Twitter stream
*/
app.controller('Timer', ['$scope', '$http', function($scope, $http) {
  
  // Default duration of stream capture
  $scope.duration = 5*60*1000; 

  /*
  * Sent Start command to server and update controller internals
  */
  $scope.start = function() {
    $http.get('/api/start').then(function(result) {
      // success
      console.log('Stream Started');
      
      $scope.startTime = Date.now();
      $scope.stopTime = undefined;
      
      // Set timer to stop stream after a duration
      $scope.timeout = setTimeout($scope.stop, $scope.duration);
      
    }, function(reason) {
      // error
      console.error(reason);
    });
  };


  /*
  *  Send a Stop command to server and update controller internals
  */
  $scope.stop = function() {
    $http.get('/api/stop').then(function(result) {
      // success
      console.log('Stream Stopped');
      
      $scope.stopTime = Date.now();
      
      // Clear timer that was started by the start()
      if($scope.timeout) {
        clearTimeout($scope.timeout);
        $scope.timeout = undefined;
      }
    }, function(reason) {
      console.error(reason);
    });
  };

  /*
  *   Send a Reset command to the server and update controller internals
  */
  $scope.reset = function() {
    
    // Stop stream on the server
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

  /*
  *  Calculate elapsed time since Twitter stream was started.
  */
  $scope.timeElapsed = function() {
    if(!$scope.startTime) return 0;
    if(!$scope.stopTime)  return (Date.now() - $scope.startTime)/1000;

    return ($scope.stopTime - $scope.startTime) / 1000;
  };

  // Reset on initialization;
  $scope.reset();
  
}]);

/*
*  Handle communication between controllers using events for resetting display.
*/
app.run(function($rootScope) {
  $rootScope.$on('callForReset', function(event, args) {
    console.log('Reset caught on rootScope.');
    $rootScope.$broadcast('reset', args);
  });
});
