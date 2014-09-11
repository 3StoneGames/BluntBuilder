function log(idIn, valueIn, positionXIn, positionYIn) {
    var logContext = this;
    this.id = idIn;
    this.value = valueIn;
    this.texture = PIXI.Texture.fromImage("log.png");
    this.textureTrue = PIXI.Texture.fromImage("log_true.png");
    this.textureFalse = PIXI.Texture.fromImage("log_false.png");

    this.positionX = positionXIn;
    this.positionY = positionYIn;
    this.sprite = new PIXI.Sprite(this.texture);
    this.sprite.position.x = this.positionX;
    this.sprite.position.y = this.positionY;
    this.sprite.anchor.x = 0;
    this.sprite.anchor.y = 0;
    this.sprite.height = maxHeight / 16 * 2;
    this.sprite.width = maxWidth / 10;
    
    //this.text = new PIXI.BitmapText("Pixi.js can has\nmultiline text!", { font: "35px Snippet", fill: "white", align: "left" });
    this.text = new PIXI.Text(this.value + "", { font: "bold italic 40px Arvo", fill: "#3e1707", align: "center", stroke: "#a4410e", strokeThickness: 7 });
    
    this.text.position.x = this.positionX + this.sprite.width / 2.4;
    this.text.position.y = this.positionY + this.sprite.height / 3;

    this.setTextureTrue = function () {
        this.sprite.setTexture(logContext.textureTrue);
        this.height = maxHeight / 16 * 2;
        this.width = maxWidth / 10;
    }

    this.setTextureFalse = function () {
        var sprite = this.sprite;
        sprite.setTexture(logContext.textureFalse);

        setTimeout(function () { sprite.setTexture(logContext.texture); }, 500);
        this.height = maxHeight / 16 * 2;
        this.width = maxWidth / 10;
    }

    this.setTextureNormal = function () {
        this.sprite.setTexture(logContext.texture);
        this.height = maxHeight / 16 * 2;
        this.width = maxWidth / 10;
    }

}

function logInitialize(gameContext) {
        
    var logCount = 0;
    var logMaxCount = 8;
    var logX = maxWidth / 5 * 4;
    var logY = maxHeight / 16 * 2.5;
    var resultArray = new Array(8);
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
        var randomValue = Math.floor((Math.random() * 8) + 1);
        var templog = new log(logCount + 1, randomValue, logX, logY);
        resultArray[logCount] = templog;
        var logSprite = templog.sprite;
        stage.addChild(logSprite);
        stage.addChild(templog.text);
        logCount = logCount + 1;
    }

    return resultArray;
}