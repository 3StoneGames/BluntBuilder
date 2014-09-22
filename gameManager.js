function gameManager() {
    var gameManagerContext = this;
    this.isInitialized = false;
    this.finishedRound = false;
    this.startTime = null;
    this.timeLeft = null;
    this.maxTime = 60000;
    this.fontDefault = Math.floor(maxWidth / 100);

    
    this.initialize = function () 
    {
        
        this.startTime = Date.now();
        this.timeLeft = this.maxTime;
        this.highScore = 0;
        this.highScoreText = new PIXI.Text(this.highScore + "", {font: "bold " + gameManager.fontDefault * 3 + "px Podkova", fill: "#cc00ff", align: "center", stroke: "#FFFFFF", strokeThickness: 6});
        
        this.highScoreText.position.x = 0;
        this.highScoreText.position.y = 0;
        
        stage.addChild(this.highScoreText);

        this.timeLeftText = new PIXI.Text(this.timeLeft.toString().substring(0,2), {font: "bold "+ gameManager.fontDefault * 3 + "px Podkova", fill: "#cc00ff", align: "center", stroke: "#FFFFFF", strokeThickness: 6});
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
        gameManagerContext.highScoreText = new PIXI.Text("Highscore: " + "Unknown" + "\n", {font: "bold " + gameManager.fontDefault * 3 + "px Podkova", fill: "green", align: "center", stroke: "#FFFFFF", strokeThickness: 6});
        gameManagerContext.highScoreText.position.x = 20;
        gameManagerContext.highScoreText.interactive = true;

        gameManagerContext.yourScoreText = new PIXI.Text("Your Score: " + this.highScore, {font: "bold " + gameManager.fontDefault * 3 +"px Podkova", fill: "green", align: "center", stroke: "#FFFFFF", strokeThickness: 6})
        gameManagerContext.yourScoreText.position.x = 50;
        gameManagerContext.yourScoreText.position.y = 80;
        xmlHttp = new XMLHttpRequest();
        
        
        xmlHttp.onreadystatechange=function()
        {
            if (xmlHttp.readyState==4 && xmlHttp.status==200)
            {
                gameManagerContext.highScoreText.setText("Highscore: " + xmlHttp.responseText + "\n", {font: "bold " + gameManager.fontDefault * 3 + "px Podkova", fill: "green", align: "center", stroke: "#FFFFFF", strokeThickness: 6});
                
            }
        }

        xmlHttp.open( "GET", "http://3stone-games.it/highscore/set/" + gameManagerContext.highScore.toString(), true );
        xmlHttp.send(  );

        gameManagerContext.highScoreText.mousedown = gameManagerContext.highScoreText.touchstart = function (data) {
            
            //var bla = gameManager;
            //gameMenuContext.clear();
            
            gameState = 1;
            //gameMenuContext.clear();
        }

        stage.addChild(gameManagerContext.highScoreText);
        stage.addChild(gameManagerContext.yourScoreText);
    }

}


