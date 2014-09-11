function gameMenu() {
    var gameMenuContext = this;
   
    this.isInitialized = false;
    
    this.initialize = function () 
    {
        this.startButtonTexture = PIXI.Texture.fromImage("/bluntbuilder/startbutton.png");
        this.startButtonSprite = generateSprite(this.startButtonTexture, maxWidth / 2 - 200, maxHeight / 2 - 100, 400, 200); 
        this.startButtonSprite.interactive = true;
        stage.addChild(this.startButtonSprite);

        gameMenuContext.isInitialized = true;

        this.startButtonSprite.mousedown = this.startButtonSprite.touchstart = function (data) {
            
            //var bla = gameManager;
            gameMenuContext.clear();
            gameState = 1;
            //gameMenuContext.clear();
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


