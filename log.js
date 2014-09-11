function log(idIn, valueIn, positionXIn, positionYIn) {
    var logContext = this;
    this.id = idIn;
    this.value = valueIn;
    this.frameTexture = PIXI.Texture.fromImage("/bluntbuilder/log2.png");
    //this.textureIndicatorNormal = PIXI.Texture.fromImage("leaf_empty.png");
    this.textureIndicatorTrue = PIXI.Texture.fromImage("/bluntbuilder/leaf_true.png");
    this.textureIndicatorFalse = PIXI.Texture.fromImage("/bluntbuilder/leaf_false.png");
    this.textureBackground = PIXI.Texture.fromImage("/bluntbuilder/buds/bud" + this.value + ".png");

    this.positionX = positionXIn;
    this.positionY = positionYIn;
    this.height = maxHeight / 16 * 2;
    this.width = maxWidth / 10;
    
    


    this.frameSprite = generateSprite(this.frameTexture, this.positionX, this.positionY, this.width, this.height);
    //this.indicatorSprite = generateSprite(this.textureIndicatorNormal, this.positionX + this.width / 4, this.positionY, this.width / 2, this.height);
    this.indicatorTrueSprite = generateSprite(this.textureIndicatorTrue, this.positionX + this.width / 4, this.positionY, this.width / 2, this.height);
    this.indicatorFalseSprite = generateSprite(this.textureIndicatorFalse, this.positionX + this.width / 4, this.positionY, this.width / 2, this.height);
    this.backgroundSprite = generateSprite(this.textureBackground, this.positionX, this.positionY, this.width, this.height);

    //this.text = new PIXI.BitmapText("Pixi.js can has\nmultiline text!", { font: "35px Snippet", fill: "white", align: "left" });
    this.text = new PIXI.Text(this.value + "", { font: "bold italic 18px Arvo", fill: "#3e1707", align: "center", stroke: "#a4410e", strokeThickness: 7 });
    
    this.text.position.x = this.positionX + this.width / 2.4;
    this.text.position.y = this.positionY + this.height / 3;

    this.setNormal = function () {
        //this.sprite.setTexture(logContext.texture);
        var hasChild = stage.children.indexOf( logContext.indicatorFalseSprite ) !== -1;
        if(hasChild){
             stage.removeChild(logContext.indicatorFalseSprite);
        }

        //stage.addChild(logContext.indicatorSprite);
       
        //this.height = maxHeight / 16 * 2;
        //this.width = maxWidth / 10;
    }


    this.setTrue = function () {
        //this.sprite.setTexture(logContext.textureIndicatorTrue);
        stage.addChild(logContext.indicatorTrueSprite);
        //this.height = maxHeight / 16 * 2;
        //this.width = maxWidth / 10;
    }

    this.setFalse = function () {
        //var sprite = this.sprite;
        //sprite.setTexture(logContext.textureIndicatorFalse);
        //console.log(logContext.indicatorFalseSprite);
        stage.addChild(logContext.indicatorFalseSprite);

        setTimeout(function () { logContext.setNormal() }, 500);
        //this.height = maxHeight / 16 * 2;
        //this.width = maxWidth / 10;
    }

    

}

function logInitialize(valueArray) {
    
    var logCount = 0;
    var logMaxCount = valueArray.length;

    var logX = maxWidth / 5 * 4;
    var logY = maxHeight / 16 * 2.5;
    var resultArray = new Array(logMaxCount);
    
    while (logCount < logMaxCount) {
        if (logCount != 0) {

            if (logCount % 2 == 0) {
                logX = logX - maxWidth / 10;
                logY = logY + maxHeight / 16 * 2;
            }
            else {
                logX = logX + maxWidth / 10;
                
            }
        }
        var value = valueArray[logCount];
        var templog = new log(logCount + 1, value, logX, logY);
        resultArray[logCount] = templog;
        var logFrameSprite = templog.frameSprite;
        var logIndicatorSprite = templog.indicatorSprite;
        stage.addChild(templog.backgroundSprite);
        stage.addChild(logFrameSprite);
        //stage.addChild(logIndicatorSprite);
        
        //stage.addChild(templog.text);
        logCount = logCount + 1;
    }

    return resultArray;
}
