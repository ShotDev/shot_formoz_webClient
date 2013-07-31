describe("Band", function(){
  var Band;

  beforeEach(function(){
    module("shotFormozWebClientApp");
    inject(["Band", function(BandClass) {
      Band = BandClass;
    }]);
  });

  describe("init", function(){
    var bandData;
    beforeEach(function(){
      bandData = {
        name: "band-name"
        , start_time: 1375434000000
        , end_time: 1375436400000
      }  
    });
    
    it("takes a band data with name to init", function(){
      var band = new Band(bandData);

      expect(band.name).toEqual("band-name");
    });

    it("takes a band data with two date strings to init", function(){
      var band = new Band(bandData);

      expect(band.startTime).toEqual(new Date(bandData.start_time));
      expect(band.endTime).toEqual(new Date(bandData.end_time));
    });

    it("throws if no start_time given", function(){
      delete bandData.start_time;

      expect(function() {
        var band = new Band(bandData);
      }).toThrow();
    });

    it("throws if no end_time given", function(){
      delete bandData.end_time;

      expect(function() {
        var band = new Band(bandData);
      }).toThrow();
    });
    
  });
  
});

