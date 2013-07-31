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
          getEarliestTime: function() {
            return mockEarliestTime1;
          }
          , assignDate: jasmine.createSpy("assignDate1")
        }
        , stage2 = {
          getEarliestTime: function() {
            return mockEarliestTime2;
          }
          , assignDate: jasmine.createSpy("assignDate1")
        };

      date.addStage(stage1);
      date.addStage(stage2);

      expect(date.getStartTime()).toEqual(new Date(2013, 7, 2, 17));
    });
    
      
  });
  
  
});
