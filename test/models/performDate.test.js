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
  
});
