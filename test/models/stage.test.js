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
      band = {
        startTime: new Date(2013, 7, 2, 17)
      };
    });

    it("sets band into stage.bands", function(){
      stage.addBand(band);

      expect(stage.getBands()).toEqual([band]);
    });
    
    it("sorts bands by startTime", function(){
      var laterBand = {
        startTime: new Date(2013, 7, 2, 20)
      };

      stage.addBand(laterBand);
      stage.addBand(band);

      expect(stage.getBands()).toEqual([ band, laterBand ]);
    });
    
    
  });

  describe("#getStartTime", function(){
    it("returns the earliest date of bands", function(){
      var stage = new Stage()
        , date1 = new Date(2013, 8, 3, 11)
        , date2 = new Date(2013, 8, 5, 11);
    
      stage.addBand({name: "band1", startTime: date1});
      stage.addBand({name: "band2", startTime: date2});

      expect(stage.getStartTime()).toEqual(date1);
    });
  });
  
  describe("#assignDate", function(){
    it("set date to stage.date", function(){
      var stage = new Stage()
        , date = {};
      stage.assignDate(date);

      expect(stage.date).toBe(date);
    });
  });

  describe("#getTimeSpans", function(){
    function createBand (name, month, day, hour, minute) {
      var startTime = new Date(2013, month, day, hour, minute);
      return {
        startTime: startTime
        , endTime: new Date(startTime.getTime() + 40 * 60 * 1000)
        , name: name
      };
    }

    it("returns time spans array of bands", function(){
      var date = {
        getStartTime: function() {
          return new Date(2013, 8, 2, 11);
        }
      }
      , stage = new Stage();

      stage.assignDate(date);
      stage.addBand(createBand("band1", 8, 2, 11, 30));
      stage.addBand(createBand("band2", 8, 2, 15, 20));

      expect(stage.getTimeSpans()).toEqual([
        { span: 3, type: "empty", name: "", startTime: "", endTime: "" }  
        , { span: 4, type: "band", name: "band1", startTime: "11:30", endTime: "12:10" }
        , { span: 19, type: "empty", name: "", startTime: "", endTime: ""}
        , { span: 4, type: "band", name: "band2", startTime: "15:20", endTime: "16:00" }
      ]);
    });
    
      
  });
  
});

