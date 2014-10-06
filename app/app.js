var app = angular.module('topTerms', []);

var dummyData = {
  statuses: [
    'hello there',
    'I think',
    'We have something here'
  ],
  topTerms: [
    {
      name: 'hello',
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

app.controller('TwitterStream', ['$scope', function($scope) {
  $scope.statuses = dummyData.statuses;
}]);

app.controller('TopTerms', ['$scope', function($scope) {
  $scope.topTerms = dummyData.topTerms;
}]);