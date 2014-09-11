function menu(idIn, logManagerContextIn, positionXIn, positionYIn) {
    this.logManagerContext = logManagerContextIn;
    var menuContext = this;
    this.id = idIn;
    this.texture = PIXI.Texture.fromImage("menu.png");
    if(this.id == 1)
    {
        
        this.texture = PIXI.Texture.fromImage("menu_1.png");
    }
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

    this.text = new PIXI.Text(this.id + "", { font: "bold italic 18px Arial", fill: "#3e1707", align: "center", stroke: "#a2210e", strokeThickness: 7 });

    this.text.position.x = this.positionX + this.sprite.width / 2.4;
    this.text.position.y = this.positionY + this.sprite.height / 3;

    this.sprite.interactive = true;

    this.sprite.mousedown = this.sprite.touchstart = function (data) {
        this.setTexture(menuContext.clickedTexture);
        this.height = maxHeight / 16 * 2.5;
        this.width = maxWidth / 5;
        var activeLogEntry = menuContext.logManagerContext.allLogs[menuContext.logManagerContext.activeLog]
        
        if (menuContext.id == menuContext.logManagerContext.allLogs[menuContext.logManagerContext.activeLog].value) {
            activeLogEntry.setTextureTrue();

            if (menuContext.logManagerContext.maxLogCount == menuContext.logManagerContext.activeLog + 1) {
                menuContext.logManagerContext.activeLog = 0;
                menuContext.logManagerContext.setLogs(menuContext.logManagerContext.getNewLogs());
                var count = 0;
                /*while (count < menuContext.logManagerContext.maxLogCount) {
                    var entry = menuContext.logManagerContext.allLogs[count];
                    entry.setTextureNormal();
                    count = count + 1;
                }
*/
               
            }
            else {

                menuContext.logManagerContext.activeLog = menuContext.logManagerContext.activeLog + 1;

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

function menuInitialize(logManagerContext) {
   
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
        var tempMenu = new menu(menuCount + 1, logManagerContext, menuX, menuY);
        var menuSprite = tempMenu.sprite;
        stage.addChild(menuSprite);
        stage.addChild(tempMenu.text);
        menuCount = menuCount + 1;
    }
}