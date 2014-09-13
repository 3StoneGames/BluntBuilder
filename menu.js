function menu(idIn, logManagerContextIn, positionXIn, positionYIn) {
    this.logManagerContext = logManagerContextIn;
    var menuContext = this;
    this.id = idIn;
    this.texture = PIXI.Texture.fromImage("/bluntbuilder/menu2.png");
    this.textureBackground = PIXI.Texture.fromImage("/bluntbuilder/buds/bud" + this.id + ".png");
    this.clickedTexture = PIXI.Texture.fromImage("/bluntbuilder/menu_active_simple.png");
    this.positionX = positionXIn;
    this.positionY = positionYIn;
    this.width = maxWidth / 5;
    this.height = maxHeight / 16 * 2.5;

    this.sprite = generateSprite(this.texture, this.positionX, this.positionY, this.width, this.height); 
    this.clickedSprite =  generateSprite(this.clickedTexture, this.positionX, this.positionY, this.width, this.height); 
    this.backgroundSprite = generateSprite(this.textureBackground, this.positionX, this.positionY, this.width, this.height);


    this.text = new PIXI.Text(this.id + "", { font: "bold italic 18px Arial", fill: "#3e1707", align: "center", stroke: "#a2210e", strokeThickness: 7 });

    this.text.position.x = this.positionX + this.sprite.width / 2.4;
    this.text.position.y = this.positionY + this.sprite.height / 3;

    this.sprite.interactive = true;

    if(!!('ontouchstart' in window))
    {
        this.sprite.touchstart = function (event) {
            menuClickedEvent(this);       
        }
    }
    else
    {
        this.sprite.mousedown = function (event) {
            menuClickedEvent(this);       
        }
    }
    

    function menuClickedEvent(sprite){
        //console.log(sprite);
        stage.addChild(menuContext.clickedSprite);
          
        sprite.height = maxHeight / 16 * 2.5;
        sprite.width = maxWidth / 5;
        var activeLogEntry = menuContext.logManagerContext.allLogs[menuContext.logManagerContext.activeLog]
        
        if (menuContext.id == menuContext.logManagerContext.allLogs[menuContext.logManagerContext.activeLog].value) {
            activeLogEntry.setTrue();
            
            if (menuContext.logManagerContext.maxLogCount == menuContext.logManagerContext.activeLog + 1) {
                menuContext.logManagerContext.activeLog = 0;
                menuContext.logManagerContext.setLogs(menuContext.logManagerContext.getNewLogs());
                gameManager.highScore += 200;
                gameManager.highScoreText.setText(gameManager.highScore + "");
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

function menuInitialize(gameManagerContext) {
   
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
        var tempMenu = new menu(menuCount + 1, gameManagerContext.logManager, menuX, menuY);
        var menuSprite = tempMenu.sprite;
        stage.addChild(tempMenu.backgroundSprite);
        stage.addChild(menuSprite);
        //stage.addChild(tempMenu.text);
        menuCount = menuCount + 1;
    }
}