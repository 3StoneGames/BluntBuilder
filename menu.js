function menu(idIn, logManagerContextIn, positionXIn, positionYIn) {
    this.logManagerContext = logManagerContextIn;
    var menuContext = this;
    this.id = idIn;
    this.texture = PIXI.Texture.fromImage("menu2.png");
    this.textureBackground = PIXI.Texture.fromImage("buds/bud" + this.id + ".png");
    this.clickedTexture = PIXI.Texture.fromImage("menu_active_simple.png");
    this.positionX = positionXIn;
    this.positionY = positionYIn;
    this.width = maxWidth / 5;
    this.height = maxHeight / 16 * 2.5;

    this.sprite = generateSprite(this.texture, this.positionX, this.positionY, this.width, this.height); 
    this.clickedSprite =  generateSprite(this.clickedTexture, this.positionX, this.positionY, this.width, this.height); 
    this.backgroundSprite = generateSprite(this.textureBackground, this.positionX, this.positionY, this.width, this.height);


    this.text = new PIXI.Text(this.id + "",{font: "bold 60px Podkova", fill: "#cc00ff", align: "center", stroke: "#FFFFFF", strokeThickness: 6});

    this.text.position.x = this.positionX + this.sprite.width / 2.4;
    this.text.position.y = this.positionY + this.sprite.height / 3;

    this.sprite.interactive = true;

    this.sprite.mousedown = this.sprite.touchstart = function (data) {
       
        stage.addChild(menuContext.clickedSprite);
              
        this.height = maxHeight / 16 * 2.5;
        this.width = maxWidth / 5;
        var activeLogEntry = menuContext.logManagerContext.allLogs[menuContext.logManagerContext.activeLog]
        
        if (menuContext.id == menuContext.logManagerContext.allLogs[menuContext.logManagerContext.activeLog].value) {
            activeLogEntry.setTrue();

            if (menuContext.logManagerContext.maxLogCount == menuContext.logManagerContext.activeLog + 1) {
                menuContext.logManagerContext.activeLog = 0;
                menuContext.logManagerContext.setLogs(menuContext.logManagerContext.getNewLogs());
                highScore += 200;
                highScoreText.setText(highScore + "");
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
            activeLogEntry.setFalse();
        }
    }

    this.sprite.mouseup = this.sprite.touchend = function (data) {
        var hasChild = stage.children.indexOf( menuContext.clickedSprite ) !== -1;
        if(hasChild)
        {
            stage.removeChild(menuContext.clickedSprite);
        }
        
    }

    this.sprite.mouseout = function (data) {
         var hasChild = stage.children.indexOf( menuContext.clickedSprite ) !== -1;
        if(hasChild)
        {
            stage.removeChild(menuContext.clickedSprite);
        }
    }

}

function menuInitialize(logManagerContext) {
   
    var menuCount = 0;
    var menuMaxCount = 8;
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
        stage.addChild(tempMenu.backgroundSprite);
        stage.addChild(menuSprite);
        //stage.addChild(tempMenu.text);
        menuCount = menuCount + 1;
    }
}