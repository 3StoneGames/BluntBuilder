function menu(idIn, gameContextIn, positionXIn, positionYIn) {
    this.gameContext = gameContextIn;
    var menuContext = this;
    this.id = idIn;
    this.texture = PIXI.Texture.fromImage("menu.png");
    this.clickedTexture = PIXI.Texture.fromImage("menu_active.png");
    this.positionX = positionXIn;
    this.positionY = positionYIn;
    this.sprite = new PIXI.Sprite(this.texture);
    this.sprite.position.x = this.positionX;
    this.sprite.position.y = this.positionY;
    this.sprite.anchor.x = 0;
    this.sprite.anchor.y = 0;
    this.sprite.height = maxHeight / 16 * 2.5;
    this.sprite.width = maxWidth / 5;

    this.text = new PIXI.Text(this.id + "", { font: "bold italic 40px Arial", fill: "#3e1707", align: "center", stroke: "#a2210e", strokeThickness: 7 });

    this.text.position.x = this.positionX + this.sprite.width / 2.4;
    this.text.position.y = this.positionY + this.sprite.height / 3;

    this.sprite.interactive = true;

    this.sprite.mousedown = this.sprite.touchstart = function (data) {
        this.setTexture(menuContext.clickedTexture);
        this.height = maxHeight / 16 * 2.5;
        this.width = maxWidth / 5;
        var activeLogEntry = menuContext.gameContext.allLogs[menuContext.gameContext.activeLog]
        
        if (menuContext.id == menuContext.gameContext.allLogs[menuContext.gameContext.activeLog].value) {
            activeLogEntry.setTextureTrue();

            if (menuContext.gameContext.maxLogCount == menuContext.gameContext.activeLog + 1) {
                menuContext.gameContext.activeLog = 0;
                var count = 0;
                while (count < menuContext.gameContext.maxLogCount) {
                    var entry = menuContext.gameContext.allLogs[count];
                    entry.setTextureNormal();
                    count = count + 1;
                }

            }
            else {

                menuContext.gameContext.activeLog = menuContext.gameContext.activeLog + 1;

            }
        }
        else {
            activeLogEntry.setTextureFalse();
        }
    }

    this.sprite.mouseup = this.sprite.touchend = function (data) {
        this.setTexture(menuContext.texture);
        this.height = maxHeight / 16 * 2.5;
        this.width = maxWidth / 5;
    }

    this.sprite.mouseout = function (data) {
        this.setTexture(menuContext.texture);
        this.height = maxHeight / 16 * 2.5;
        this.width = maxWidth / 5;
    }

}

function menuInitialize(gameContext) {
        
    var menuCount = 0;
    var menuMaxCount = 9;
    var menuX = 0;
    var menuY = maxHeight / 16 * 11;
    while (menuCount < menuMaxCount) {
        if (menuCount != 0) {

            if (menuCount % 2 == 0) {
                menuY = menuY - maxHeight / 16 * 2.5;
                menuX = menuX + maxWidth / 5;
            }
            else {
                menuY = menuY + maxHeight / 16 * 2.5;
            }
        }
        var tempMenu = new menu(menuCount + 1, gameContext, menuX, menuY);
        var menuSprite = tempMenu.sprite;
        stage.addChild(menuSprite);
        stage.addChild(tempMenu.text);
        menuCount = menuCount + 1;
    }
}