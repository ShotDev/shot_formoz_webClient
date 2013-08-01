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

  describe("Band::groupByPerformDateAndStage", function(){
    var bands, band1_1, band1_2, band2_1, band2_2;
    beforeEach(function(){
      band1_1 = createBand("band1_1", "stage1", 1, 11, 0);
      band1_2 = createBand("band1_2", "stage2", 1, 11, 0);
      band2_1 = createBand("band2_2", "stage1", 2, 11, 0);
      band2_2 = createBand("band2_2", "stage2", 2, 11, 0);
      bands = [ band1_1, band1_2, band2_1, band2_2 ];
    });

    function createBand (name, stage, date, hour, minute) {
      return new Band({
        name: name
        , stage: stage
        , start_time: new Date(2013, 8, date, hour, minute).getTime()
        , end_time: new Date(2013, 8, date, hour + 1, minute).getTime()
      });
    }

    it("returns array of PerformDate", inject(function(PerformDate){
      var dates = Band.groupByPerformDateAndStage(bands);
      
      _.each(dates, function(date) {
        expect(date instanceof PerformDate).toBeTruthy();
      });
    }));

    it("group by date", function(){
      var dates = Band.groupByPerformDateAndStage(bands);
        
      expect(dates.length).toEqual(2);
    });

    it("group by stage of the same day", function(){
      var dates = Band.groupByPerformDateAndStage(bands);

      expect(dates[0].getStages()[0].name).toEqual("stage1");
      expect(dates[0].getStages()[1].name).toEqual("stage2");
    });

    it("group band by stages", function(){
      var dates = Band.groupByPerformDateAndStage(bands);

      expect(dates[0].getStages()[0].getBands()[0]).toEqual(band1_1);
      expect(dates[0].getStages()[1].getBands()[0]).toEqual(band1_2);
    });
    
    
    
    
    
    

    // it("group bands by date", inject(function(PerformDate){
    //   var dates = Band.groupByPerformDateAndStage(bands);
    //   
    //   
    // }));
    
    
      
  });
  
  
});

