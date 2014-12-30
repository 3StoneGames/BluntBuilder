function gameManager() {
    var gameManagerContext = this;
    this.roundStarted = false;
    this.finishedRound = false;
    this.startTime = null;
    this.timeLeft = null;
    this.maxTime = 60000;
    this.fontDefault = Math.floor(maxWidth / 100);
    this.releaseMode = true;
    this.imageRootPath = "";
    if(this.releaseMode)
    {
        //local mit vs "/bluntbuilder/"
        //local ohne vs ""
        //für android compilen "img/"
        this.imageRootPath = "img/";
    }
    
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

        this.customerManager = new customerManager();
        this.customerManager.initialize();

        this.logManager = new logManager();
        this.logManager.initialize(this.customerManager);
       
        
        menuInitialize(this);

        gameManagerContext.roundStarted = true;
    };

    this.clear = function()
    {
        this.startTime = null;
        this.timeLeft = null;
        while(stage.children.length > 0){ 
          var child = stage.getChildAt(0);
          stage.removeChild(child);
        }
        gameManagerContext.roundStarted = false;

    }



    this.end = function()
    {
        this.clear();
        this.finishedRound = true;
        this.highScoreText = new PIXI.Text("Highscore: " + "Unknown" + "\n", {font: "bold " + gameManager.fontDefault * 3 + "px Podkova", fill: "green", align: "center", stroke: "#FFFFFF", strokeThickness: 6});
        this.highScoreText.position.x = 20;
        this.highScoreText.interactive = true;

        this.yourScoreText = new PIXI.Text("Your Score: " + this.highScore, {font: "bold " + gameManager.fontDefault * 3 +"px Podkova", fill: "green", align: "center", stroke: "#FFFFFF", strokeThickness: 6})
        this.yourScoreText.position.x = 50;
        this.yourScoreText.position.y = 80;        
        /*
        xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange=function()
        {
            if (xmlHttp.readyState==4 && xmlHttp.status==200)
            {
                gameManager.changeScore()
                gameManagerContext.highScoreText.setText("Highscore: " + xmlHttp.responseText + "\n", {font: "bold " + gameManager.fontDefault * 3 + "px Podkova", fill: "green", align: "center", stroke: "#FFFFFF", strokeThickness: 6});
                
            }
        }

        xmlHttp.open( "GET", "http://3stone-games.it/highscore/set/" + gameManagerContext.highScore.toString(), true );
        xmlHttp.send(  );
*/
        gameManagerContext.highScoreText.mousedown = gameManagerContext.highScoreText.touchstart = function (data) {     
            gameState = 1;   
        }

        stage.addChild(gameManagerContext.highScoreText);
        stage.addChild(gameManagerContext.yourScoreText);

        gameState = 3;
    }

    this.addScore = function(amount)
    {
        this.highScore += amount;
        this.highScoreText.setText(gameManager.highScore + "");
    }

    this.changeScore = function(score)
    {
        this.highScore = score;
        this.highScoreText.setText(gameManager.highScore + "");
    }

    this.animate = function()
    {
        var processedTime = Date.now() - this.startTime;
        this.timeLeft = this.maxTime - processedTime;
        var timeleftAsText = this.timeLeft;


        while (timeleftAsText.toString().length < 5) {
            timeleftAsText = "0" + timeleftAsText;
        }

        var timeLeftAsTextInSeconds = timeleftAsText.toString().substring(0, 2);
        gameManager.timeLeftText.setText(timeLeftAsTextInSeconds);
        
        this.customerManager.animate(this.timeLeft / 1000);


        if (gameManager.timeLeft < 0) {
            gameManager.end();                        
        }
    }

}


