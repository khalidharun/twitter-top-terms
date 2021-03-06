var TopTerms = require('./topterms');

describe("TopTerms", function() {
  it( "should be defined", function() {
    expect(TopTerms).toBeDefined();
  });

  describe("when empty", function() {
    var topTerms = new TopTerms();

    describe("allTerms", function() {

      var allTerms = topTerms.allTerms;

      it( "should be defined", function() {
        expect(allTerms).toBeDefined();
      });

      it( "should be an empty dictionary", function() {
        expect(allTerms).toEqual({});
      });
    });

    describe("statusBuffer", function() {
      var statusBuffer = topTerms.statusBuffer;

      it( "should be defined", function() {
        expect(statusBuffer).toBeDefined();
      });

      it( "should be an empty array", function() {
        expect(statusBuffer).toEqual([]);
      });
    });

  }); // when empty

  describe( "when has processed one status", function() {

    var topTerms;
    var status = "lorem ipsum ipsum dolor dolor dolor";
    var allTermsTest = {lorem: 1, ipsum: 2, dolor: 3};
    var topTermsTest = [['dolor', 3], ['ipsum', 2], ['lorem', 1]];

    beforeEach(function() {
      topTerms = new TopTerms();
      topTerms.processStatus(status);
    });

    it( "should have accumlated in allTerms", function() {
      expect(topTerms.allTerms).toEqual(allTermsTest);
    });

    it ("should have add to statusBuffer", function() {
      expect(topTerms.statusBuffer).toEqual([status]);
    });

    it ("should have the correct topTerm", function() {
      expect(topTerms.getTopTerms()).toEqual(topTermsTest);
    });


    it("should skip stop words", function() {
      topTerms = new TopTerms();
      var statusPlus = status + ' http';
      topTerms.processStatus(statusPlus)

      expect(topTerms.statusBuffer).toEqual([statusPlus]);
      expect(topTerms.getTopTerms()).toEqual(topTermsTest);
    });

    describe( "and when getLatestStatus is called", function() {
      var latestStatuses;

      beforeEach(function() {
        topTerms = new TopTerms();
        topTerms.processStatus(status);
        latestStatuses = topTerms.getLatestStatuses();
      });

      it ("should return latest statuses", function() {
        expect(latestStatuses).toEqual([status]);
      });

      it ("should clear out statusBuffer", function() {
        expect(topTerms.statusBuffer).toEqual([]);
      });
    });
  }); // when has one status
});