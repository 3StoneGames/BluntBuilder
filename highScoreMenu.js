function highScoreMenu() {
    var highScoreMenuContext = this;
    
    this.highScoreList;
    this.highScoreTextList;
    this.isInitialized = false;
    this.highScoreHeadline;
    this.initialize = function () 
    {
        xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange=function()
        {
            if (xmlHttp.readyState==4 && xmlHttp.status==200)
            {
                highScoreList = xmlHttp.responseText.split(';');
                
                highScoreHeadline = new PIXI.Text("HighScores", {font: "bold " + gameManager.fontDefault * 3 + "px Podkova", fill: "#cc00ff", align: "center", stroke: "#FFFFFF", strokeThickness: 6});
        
                highScoreHeadline.position.x = maxWidth / 2 - 150;
                highScoreHeadline.position.y = 50;
                stage.addChild(highScoreHeadline);

                highScoreBack = new PIXI.Text("Back", {font: "bold " + gameManager.fontDefault * 3 + "px Podkova", fill: "#cc00ff", align: "center", stroke: "#FFFFFF", strokeThickness: 6});
        
                highScoreBack.mousedown = highScoreBack.touchstart = function (data) {     
                    gameState = 0;   
                }

                highScoreBack.position.x = maxWidth / 2 - 150;
                highScoreBack.position.y = maxHeight - 200;
                highScoreBack.interactive = true;

                stage.addChild(highScoreBack);
        
                var count = 0;
                while(count < 10)
                {
                    var score = highScoreList[count];
                    var highScoreText = new PIXI.Text(count + 1 + ". " + score + "", {font: "bold " + gameManager.fontDefault * 3 + "px Podkova", fill: "#cc33ff", align: "center", stroke: "#000000", strokeThickness: 6});
                    highScoreText.x = maxWidth / 2 - 150;
                    highScoreText.y = 200 + 50 * count;

                    stage.addChild(highScoreText);   

                    count = count+1;
                }
                //foreach highscore mach eintrag
                //gameManagerContext.highScoreText.setText("Highscore: " + xmlHttp.responseText + "\n", {font: "bold " + gameManager.fontDefault * 3 + "px Podkova", fill: "green", align: "center", stroke: "#FFFFFF", strokeThickness: 6});
                
            }
        }       

        if(this.releaseMode)
        {
            xmlHttp.open( "GET", "http://3stone-games.it/highscore/get/", true );            
        }
        else
        {
            xmlHttp.open( "GET", "http://localhost:54513/highscore/get/", true);
        }

        xmlHttp.send(  );

        this.isInitialized = true;
    };

    this.clear = function()
    {
        

    }


    this.animate = function()
    {
        

    }

}


