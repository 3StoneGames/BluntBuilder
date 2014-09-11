function log(idIn, valueIn, positionXIn, positionYIn) {
    var logContext = this;
    this.id = idIn;
    this.value = valueIn;
    this.texture = PIXI.Texture.fromImage("log.png");
    this.textureTrue = PIXI.Texture.fromImage("log_true.png");
    if(this.value == 1)
    {
        this.textureTrue = PIXI.Texture.fromImage("log_true_1.png")
        this.texture = PIXI.Texture.fromImage("menu_1.png");
    }
    
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
    this.text = new PIXI.Text(this.value + "", { font: "bold italic 18px Arvo", fill: "#3e1707", align: "center", stroke: "#a4410e", strokeThickness: 7 });
    
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

function logInitialize(valueArray) {
    
    var logCount = 0;
    var logMaxCount = valueArray.length;

    var logX = maxWidth / 5 * 4;
    var logY = maxHeight / 16 * 2.5;
    var resultArray = new Array(logMaxCount);
    console.log(valueArray);
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
        var logSprite = templog.sprite;
        stage.addChild(logSprite);
        stage.addChild(templog.text);
        logCount = logCount + 1;
    }

    return resultArray;
}
