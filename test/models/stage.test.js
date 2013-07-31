describe("Stage", function(){
  var Stage;

  beforeEach(function(){
    module("shotFormozWebClientApp");  
    inject(["Stage", function(StageClass) {
      Stage = StageClass;
    }]);
  });
   
  it("can init instance", function(){
    var stage = new Stage;
  });

  it("takes a name to init", function(){
    var stage = new Stage("the-name");

    expect(stage.name).toEqual("the-name");
  });

  describe("#getBands", function(){
    var stage;

    beforeEach(function(){
      stage = new Stage();  
    });

    it("returns default emtpy array", function(){
      expect(stage.getBands()).toEqual([]);
    });
  });

  describe("#addBand", function(){
    var stage, band;
    beforeEach(function(){
      stage = new Stage();  
      band = {};
    });

    it("sets band into stage.bands", function(){
      stage.addBand(band);

      expect(stage.getBands()).toEqual([band]);
    });
  });

  describe("#getEarliestTime", function(){
    it("returns the earliest date of bands", function(){
      var stage = new Stage()
        , date1 = new Date("2013-08-03 11:00:00")
        , date2 = new Date("2013-08-05 11:00:00");
    
      stage.addBand({name: "band1", startTime: date1});
      stage.addBand({name: "band2", startTime: date2});

      expect(stage.getEarliestTime()).toEqual(date1);
    });
    
    
  });
  
  
  
  
  
    
});

