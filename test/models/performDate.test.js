describe("PerformDate", function(){
  var PerformDate;

  beforeEach(function(){
    module("shotFormozWebClientApp");
    inject(["PerformDate", function(PerformDateClass) {
      PerformDate = PerformDateClass;
    }])
  });
  
  it("can init instance", function(){
    var performDate = new PerformDate();  
  });

  it("takes a date string to init, as name", function(){
    var performDate = new PerformDate("8/2"); 

    expect(performDate.name).toEqual("8/2");
  });

  describe("#getStages", function(){
    it("has default #getStages as an empty array", function(){
      var date = new PerformDate(); 
      expect(date.getStages()).toEqual([]);
    });
  });

  describe("#addStage", function(){
    var date, stage;

    beforeEach(function(){
      date = new PerformDate();  
      stage = { assignDate: jasmine.createSpy("assignDate") };
    });
    
    it("appends stage to performDate.stages", function(){
      date.addStage(stage);

      expect(date.getStages()).toEqual([stage]);
    });

    it("invokes stage#assignDate with itself", function(){
      date.addStage(stage);

      expect(stage.assignDate).toHaveBeenCalledWith(date);
    });
  });

  describe("#getStartTime", function(){
    it("returns start time date object by all the stages of the day", function(){
      var date = new PerformDate()
        , mockEarliestTime1 = new Date(2013, 7, 2, 17, 20)
        , mockEarliestTime2 = new Date(2013, 7, 2, 17, 50)
        , stage1 = {
          getStartTime: function() {
            return mockEarliestTime1;
          }
          , assignDate: jasmine.createSpy("assignDate1")
        }
        , stage2 = {
          getStartTime: function() {
            return mockEarliestTime2;
          }
          , assignDate: jasmine.createSpy("assignDate1")
        };

      date.addStage(stage1);
      date.addStage(stage2);

      expect(date.getStartTime()).toEqual(new Date(2013, 7, 2, 17));
    });
  });

  describe("#getEndTime", function(){
    it("returns end time date object by all the stages of the day", function(){
      var date = new PerformDate()
        , mockLastTime1 = new Date(2013, 7, 2, 17, 20)
        , mockLastTime2 = new Date(2013, 7, 2, 22, 50)
        , stage1 = {
          getEndTime: function() {
            return mockLastTime1;
          }
          , assignDate: jasmine.createSpy("assignDate1")
        }
        , stage2 = {
          getEndTime: function() {
            return mockLastTime2;
          }
          , assignDate: jasmine.createSpy("assignDate1")
        };

      date.addStage(stage1);
      date.addStage(stage2);

      expect(date.getEndTime()).toEqual(new Date(2013, 7, 2, 23));
    });
  });

  describe("#getHours", function(){
    it("returns perform hours from first perform to 0400", function(){
      var date = new PerformDate()
        , stage1 = {
          getStartTime: function() {
            return new Date(2013, 7, 2, 17, 20);
          }
          , getEndTime: function() {
            return new Date(2013, 7, 2, 23, 20);
          }
          , assignDate: jasmine.createSpy("assignDate1")
        }
        , stage2 = {
          getStartTime: function() {
            return new Date(2013, 7, 2, 17, 50);
          }
          , getEndTime: function() {
            return new Date(2013, 7, 3, 1, 20);
          }
          , assignDate: jasmine.createSpy("assignDate1")
        };

      date.addStage(stage1);
      date.addStage(stage2);

      expect(date.getHours()).toEqual([
        "17", "18", "19", "20", "21", "22", "23", "00", "01",  "02", "03"]);
    });
      
  });
  
  
  
  
});
