function log(idIn, valueIn, positionXIn, positionYIn) {
    var logContext = this;
    this.id = idIn;
    this.value = valueIn;
    this.positionX = positionXIn;
    this.positionY = positionYIn;
    this.height = maxHeight / 16 * 2;
    this.width = maxWidth / 10;
    
    


    this.frameSprite = generateSpriteFromPath(gameManager.imageRootPath + "log2.png", this.positionX, this.positionY, this.width, this.height);
    this.indicatorTrueSprite = generateSpriteFromPath(gameManager.imageRootPath + "leaf_true.png", this.positionX + this.width / 4, this.positionY, this.width / 2, this.height);
    this.indicatorFalseSprite = generateSpriteFromPath(gameManager.imageRootPath + "leaf_false.png", this.positionX + this.width / 4, this.positionY, this.width / 2, this.height);
    this.backgroundSprite = generateSpriteFromPath(gameManager.imageRootPath + "buds/bud" + this.value + ".png", this.positionX, this.positionY, this.width, this.height);

    this.text = new PIXI.Text(this.value + "", { font: "bold italic " + gameManager.fontDefault * 0.9 +"px Arvo", fill: "#3e1707", align: "center", stroke: "#a4410e", strokeThickness: 7 });
    
    this.text.position.x = this.positionX + this.width / 2.4;
    this.text.position.y = this.positionY + this.height / 3;

    this.setNormal = function () {
        //this.sprite.setTexture(logContext.texture);
        var hasChild = stage.children.indexOf( logContext.indicatorFalseSprite ) !== -1;
        if(hasChild){
             stage.removeChild(logContext.indicatorFalseSprite);
        }
  
    }


    this.setTrue = function () {
        stage.addChild(logContext.indicatorTrueSprite);
        gameManager.addScore(25);    
    }

    this.setFalse = function () {
      
        stage.addChild(logContext.indicatorFalseSprite);
        gameManager.addScore(-20);
        setTimeout(function () { logContext.setNormal() }, 500);
     
    }

    

}


