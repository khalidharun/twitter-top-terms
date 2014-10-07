'use strict';

describe("app module: ", function() {

  beforeEach(module("app"));

  describe('TopTerms controller:', function() {

    var scope, httpBackend, createController;

    beforeEach(inject(function($controller, $rootScope, $httpBackend) {
      httpBackend = $httpBackend;
      scope = $rootScope.$new();
      createController = function() {
        return $controller('TopTerms', {
          $scope: scope
        });
      };
    }));

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    it("should be defined", function() {
      var controller = createController();
      expect(controller).toBeDefined();
    });

    it("should be able to handle fetching blank topterm from /api/topTerms", function() {
      var controller = createController();

      httpBackend.expectGET('/api/topTerms').respond([]);

      scope.$apply(function() {
        scope.fetchTopTerms();
      });

      expect(scope.topTerms).toEqual([]);

      httpBackend.flush();

      expect(scope.topTerms).toEqual([]);
    });

    it("should be able to handle fetching non-blank topterms from /api/topTerms", function() {
      var controller = createController();
      var data = [['one', 1], ['two', 2], ['three', 3]];
      httpBackend.expectGET('/api/topTerms').respond(data);

      scope.$apply(function() {
        scope.fetchTopTerms();
      });

      expect(scope.topTerms).toEqual([]);

      httpBackend.flush();

      expect(scope.topTerms).toEqual(data);

    });
  });

  describe('TwitterStream controller', function() {

    var createController, scope, httpBackend;

    beforeEach(inject(function($controller, $rootScope, $httpBackend) {
      scope = $rootScope.$new();
      httpBackend = $httpBackend;
      createController = function() {
        return $controller('TwitterStream', {
          $scope: scope
        });
      };
    }));

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    it("should be defined", function() {
      var controller = createController();
      expect(controller).toBeDefined();
    });

  });

  describe('Timer controller', function() {

    var createController, scope, httpBackend;

    beforeEach(inject(function($controller, $rootScope, $httpBackend) {
      scope = $rootScope.$new();
      httpBackend = $httpBackend;
      createController = function() {
        return $controller('Timer', {
          $scope: scope
        });
      };

      httpBackend.expectGET('/api/stop').respond(200);
      httpBackend.expectGET('/api/reset').respond(200);

    }));

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    it("should be defined", function() {
      var controller = createController();
      httpBackend.flush();
      expect(controller).toBeDefined();
    });

    it("should stop", function() {
      var controller = createController();
      httpBackend.expectGET('/api/stop').respond(200);

      scope.$apply(function() {
        scope.stop();
      });

      httpBackend.flush();
    });

    it("should start", function() {
      var controller = createController();
      httpBackend.expectGET('/api/start').respond(200);

      scope.$apply(function() {
        scope.start();
      });

      httpBackend.flush();
    });

    it("should reset", function() {
      var controller = createController();
      httpBackend.expectGET('/api/stop').respond(200);
      httpBackend.expectGET('/api/reset').respond(200);

      scope.$apply(function() {
        scope.reset();
      });

      httpBackend.flush();
    });

  });
});