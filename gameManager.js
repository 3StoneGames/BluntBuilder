function gameManager() {
    var gameManagerContext = this;
    this.roundStarted = false;
    this.finishedRound = false;
    this.startTime = null;
    this.timeLeft = null;
    this.maxTime = 60000;
    this.fontDefault = Math.floor(maxWidth / 100);
    this.releaseMode = false;
    this.imageRootPath = "";
    if(this.releaseMode)
    {
        //local mit vs "/bluntbuilder/"
        //local ohne vs "/"
        //für android compilen "img/"
        this.imageRootPath = "/bluntbuilder/";
    }
    
    this.initialize = function () 
    {
        this.startTime = Date.now();
        this.timeLeft = this.maxTime;
        this.score = 0;
        this.scoreText = new PIXI.Text(this.score + "", {font: "bold " + gameManager.fontDefault * 3 + "px Podkova", fill: "#cc00ff", align: "center", stroke: "#FFFFFF", strokeThickness: 6});
        
        this.scoreText.position.x = 0;
        this.scoreText.position.y = 0;
        
        stage.addChild(this.scoreText);

        this.timeLeftText = new PIXI.Text(this.timeLeft.toString().substring(0,2), {font: "bold " + gameManager.fontDefault * 3 + "px Podkova", fill: "#cc00ff", align: "center", stroke: "#FFFFFF", strokeThickness: 6});
        this.timeLeftText.position.x = maxWidth / 2;
        this.timeLeftText.position.y = 0;

        stage.addChild(this.timeLeftText);

        this.customerManager = new customerManager();
        this.customerManager.initialize();


        this.stageManager = new stageManager();
        this.stageManager.initialize(this.customerManager);

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
        this.scoreText = new PIXI.Text("score: " + "Unknown" + "\n", {font: "bold " + gameManager.fontDefault * 3 + "px Podkova", fill: "green", align: "center", stroke: "#FFFFFF", strokeThickness: 6});
        this.scoreText.position.x = 20;
        this.scoreText.interactive = true;

        this.yourScoreText = new PIXI.Text("Your Score: " + this.score, {font: "bold " + gameManager.fontDefault * 3 +"px Podkova", fill: "green", align: "center", stroke: "#FFFFFF", strokeThickness: 6})
        this.yourScoreText.position.x = 50;
        this.yourScoreText.position.y = 80;        
     
        stage.addChild(gameManagerContext.scoreText);
        stage.addChild(gameManagerContext.yourScoreText);

        gameState = 2;

        gameManagerContext.scoreText.mousedown = gameManagerContext.scoreText.touchstart = function (data) {     
            gameState = 4;   
        }

        xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange=function()
        {
            if (xmlHttp.readyState==4 && xmlHttp.status==200)
            {
                gameManager.changeScore()
                gameManagerContext.scoreText.setText("score: " + xmlHttp.responseText + "\n", {font: "bold " + gameManager.fontDefault * 3 + "px Podkova", fill: "green", align: "center", stroke: "#FFFFFF", strokeThickness: 6});
                
            }
        }       

        if(this.releaseMode)
        {
            xmlHttp.open( "GET", "http://3stone-games.it/score/set/" + gameManagerContext.score.toString(), true );            
        }
        else
        {
            xmlHttp.open( "GET", "http://localhost:54513/score/set/" + gameManagerContext.score.toString(), true);
        }

        xmlHttp.send(  );      

        
    }

    this.addScore = function(amount)
    {
        this.score += amount;
        this.scoreText.setText(gameManager.score + "");
    }

    this.changeScore = function(score)
    {
        this.score = score;
        this.scoreText.setText(gameManager.score + "");
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


