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
  
  
  
  
    
});

