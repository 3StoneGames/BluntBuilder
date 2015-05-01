function gameMapTile(idIn, valueIn, scoreIn, positionXIn, positionYIn, gameMapContext) {
    var gameMapTileContext = this;
    this.id = idIn;
    this.value = valueIn;
    this.positionX = positionXIn;
    this.positionY = positionYIn;
    this.height = maxHeight / 4;
    this.width = maxWidth / 10;
    this.scoreHeight = this.height / 4;
    this.scoreWidth = this.width / 3.5;
    this.score = scoreIn;
    this.firstScoreSpritePath = gameManager.imageRootPath + "leaf_empty_white.png";
    this.secondScoreSpritePath = this.firstScoreSpritePath;
    this.thirdScoreSpritePath = this.secondScoreSpritePath;
    //console.log(this.score);
    if(this.score > 0)
    {
        this.firstScoreSpritePath = gameManager.imageRootPath + "leaf_true.png";        
    }
    if(this.score > 1)
    {
        this.secondScoreSpritePath = this.firstScoreSpritePath;
    }
    if(this.score > 2)
    {
        this.thirdScoreSpritePath = this.secondScoreSpritePath;
    }

    this.buttonText = new PIXI.Text("" + this.value, {font: "bold " + gameManager.fontDefault * 5 + "px Arial", fill: "#00ccff", align: "center", stroke: "#FFFFFF", strokeThickness: 6});
    this.buttonText.position.x = this.positionX + this.width / 4;
    this.buttonText.position.y = this.positionY + this.height / 4;
               
    this.buttonSprite = generateButtonFromPath(gameManager.imageRootPath + "map_tile.png", this.positionX, this.positionY, this.width, this.height);

    

    //noch gucken wegen x y w h
    this.firstScoreSprite = generateSpriteFromPath(this.firstScoreSpritePath, this.positionX, this.positionY + this.height - this.scoreHeight, this.scoreWidth, this.scoreHeight );
    this.secondScoreSprite = generateSpriteFromPath(this.secondScoreSpritePath, this.positionX + this.scoreWidth, this.positionY + this.height - this.scoreHeight, this.scoreWidth, this.scoreHeight );
    this.thirdScoreSprite = generateSpriteFromPath(this.thirdScoreSpritePath, this.positionX + (this.scoreWidth * 2), this.positionY + this.height - this.scoreHeight, this.scoreWidth, this.scoreHeight );
    
    if(!!('ontouchstart' in window))
    {
        gameMapTileContext.buttonSprite.touchstart = function (event) {
            gameMapTileContext.buttonClickedEvent();
        }
    }
    else
    {
        gameMapTileContext.buttonSprite.mousedown = function (event) {           
            gameMapTileContext.buttonClickedEvent();
        }
    }
    

    this.buttonClickedEvent = function(){     
          
        currentLevel = this.value;
        gameMapContext.isInitialized = false;
        gameState = 1
    } 

    this.addToStage = function()
    {
        stage.addChild(gameMapTileContext.buttonSprite);
        stage.addChild(gameMapTileContext.firstScoreSprite);
        stage.addChild(gameMapTileContext.secondScoreSprite);
        stage.addChild(gameMapTileContext.thirdScoreSprite);
        stage.addChild(gameMapTileContext.buttonText);
    }
    

}


