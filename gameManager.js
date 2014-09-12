function gameManager() {
    var gameManagerContext = this;
    this.isInitialized = false;
    this.finishedRound = false;
    this.startTime = null;
    this.timeLeft = null;
    this.maxTime = 60000;

    
    this.initialize = function () 
    {
        this.startTime = Date.now();
        this.timeLeft = this.maxTime;
        this.highScore = 0;
        this.highScoreText = new PIXI.Text(this.highScore + "", {font: "bold 60px Podkova", fill: "#cc00ff", align: "center", stroke: "#FFFFFF", strokeThickness: 6});
        
        this.highScoreText.position.x = 0;
        this.highScoreText.position.y = 0;
        
        stage.addChild(this.highScoreText);

        this.timeLeftText = new PIXI.Text(this.timeLeft.toString().substring(0,2), {font: "bold 60px Podkova", fill: "#cc00ff", align: "center", stroke: "#FFFFFF", strokeThickness: 6});
        this.timeLeftText.position.x = maxWidth / 2;
        this.timeLeftText.position.y = 0;

        stage.addChild(this.timeLeftText);

        this.logManager = new logManager();

        var values = this.logManager.getNewLogs();
        
        this.logManager.setLogs(values);
        
        menuInitialize(this);

        gameManagerContext.isInitialized = true;
    };

    this.clear = function()
    {
        this.logManager = null;
        this.startTime = null;
        this.timeLeft = null;
        while(stage.children.length > 0){ 
          var child = stage.getChildAt(0);
          stage.removeChild(child);
        }
        gameManagerContext.isInitialized = false;
    }

    this.end = function()
    {
        gameManagerContext.clear();
        gameManagerContext.finishedRound = true;
        gameManagerContext.highScoreText = new PIXI.Text("!Highscore!\n" + this.highScore + "", {font: "bold 80px Podkova", fill: "green", align: "center", stroke: "#FFFFFF", strokeThickness: 6});
        gameManagerContext.highScoreText.position.x = 100;
        gameManagerContext.highScoreText.interactive = true;

        var xmlHttp = null;
        xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "http://www.3stone-games.it/highscore/set/" + gameManagerContext.highScore.toString(), false );
        xmlHttp.send( null );
        

        gameManagerContext.highScoreText.mousedown = gameManagerContext.highScoreText.touchstart = function (data) {
            
            //var bla = gameManager;
            //gameMenuContext.clear();
            
            gameState = 1;
            //gameMenuContext.clear();
        }

        stage.addChild(gameManagerContext.highScoreText);
    }

}


