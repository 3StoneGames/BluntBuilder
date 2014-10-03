function gameMenu() {
    var gameMenuContext = this;
   
    this.isInitialized = false;
    
    this.initialize = function () 
    {

        //GIMMICK START!
        //------------------------------------------------------------------------------------------------------
        var budTextures = [];
        
        for (var i = 0; i < 9; i++)
        {           
            budTextures.push(PIXI.Texture.fromImage(gameManager.imageRootPath + "buds/bud" + i  + ".png"));       
        }

        buds = new PIXI.MovieClip(budTextures);
        buds.animationSpeed = 0.1;

        buds.play();//gotoAndPlay(0);
        stage.addChild(buds);

        buds.position.x = maxWidth / 2 - 200;
        buds.position.y = maxHeight / 2 - 100;
        
        buds.height = 1.9;
        buds.width = 1.665;
        //------------------------------------------------------------------------------------------------------
        //GIMMICK END!

        this.startButtonSprite = generateButtonFromPath(gameManager.imageRootPath + "startbutton2.png", maxWidth / 2 - 200, maxHeight / 2 - 100, 400, 200); 
        stage.addChild(this.startButtonSprite);

        gameMenuContext.isInitialized = true;

        this.startButtonSprite.mousedown = this.startButtonSprite.touchstart = function (data) {
                       
            gameMenuContext.clear();
            gameState = 1;            
        }



    };

    this.clear = function()
    {
        gameMenuContext.isInitialized = false;
        while(stage.children.length > 0){ 
          var child = stage.getChildAt(0);
          stage.removeChild(child);
        }
    }

}


