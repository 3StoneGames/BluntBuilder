function gameMap() {
    var gameMapContext = this;
    
    this.gameMapTileList;   
    this.isInitialized = false;    
    this.tileMaxCount = 5;
    this.initialize = function () 
    {
        if(this.releaseMode)
        {

            xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange=function()
            {
                if (xmlHttp.readyState==4 && xmlHttp.status==200)
                {
                    gameMapTileList = this.renderMap(responseText.split(';'));                    
                }
            }       

            xmlHttp.open( "GET", "http://3stone-games.it/map/get/userId", true );
            xmlHttp.send(  );
        }
        else
        {
            gameMapTileList = this.renderMap("3;2;1;;2;;;;;;;;;;;;;;;;;;;;");            
        }       

        this.isInitialized = true;
    };

    this.renderMap = function(values)
    {    
        var tileValues = values.split(';');
        var tileValueCount = 0;
        var tileX = 100;
        var tileY = maxHeight / 16 * 11;
        while(tileValueCount < gameMapContext.tileMaxCount)
        {
            var tileScore = tileValues[tileValueCount];
            var tempTile = new gameMapTile(tileValueCount, tileValueCount, tileScore, tileX * tileValueCount, tileY, gameMapContext)
            tempTile.addToStage();

            tileValueCount = tileValueCount+1;            
        }
    }

    this.clear = function()
    {
        while(stage.children.length > 0){ 
          var child = stage.getChildAt(0);
          stage.removeChild(child);
        }

        this.isInitialized = false;
    }
}


