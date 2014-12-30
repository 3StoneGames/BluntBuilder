function menu(idIn, logManagerContextIn, positionXIn, positionYIn) {
    this.logManagerContext = logManagerContextIn;
    var menuContext = this;
    this.id = idIn;
    this.positionX = positionXIn;
    this.positionY = positionYIn;
    this.width = maxWidth / 5;
    this.height = maxHeight / 16 * 2.5;

    this.sprite = generateButtonFromPath(gameManager.imageRootPath + "menu2.png", this.positionX, this.positionY, this.width, this.height); 
    this.clickedSprite =  generateSpriteFromPath(gameManager.imageRootPath + "menu_active_simple.png", this.positionX, this.positionY, this.width, this.height); 
    this.backgroundSprite = generateSpriteFromPath(gameManager.imageRootPath + "buds/bud" + this.id + ".png", this.positionX, this.positionY, this.width, this.height);


    this.text = new PIXI.Text(this.id + "", { font: "bold italic " + gameManager.fontDefault * 0.9 + "px Arial", fill: "#3e1707", align: "center", stroke: "#a2210e", strokeThickness: 7 });

    this.text.position.x = this.positionX + this.sprite.width / 2.4;
    this.text.position.y = this.positionY + this.sprite.height / 3;
 

    if(!!('ontouchstart' in window))
    {
        this.sprite.touchstart = function (event) {
            menuClickedEvent();       
        }
    }
    else
    {
        this.sprite.mousedown = function (event) {
            menuClickedEvent();       
        }
    }
    

    function menuClickedEvent(){
        stage.addChild(menuContext.clickedSprite);
          
        var activeLogEntry = menuContext.logManagerContext.allLogs[menuContext.logManagerContext.activeLog]
        
        //check if click is correct
        if (menuContext.id == activeLogEntry.value) {
            activeLogEntry.setTrue();
                
            //checked all logs correct
            if (menuContext.logManagerContext.maxLogCount == menuContext.logManagerContext.activeLog + 1) {
                menuContext.logManagerContext.activeLog = 0;

                //instead there should be the next customer in the queue                
                menuContext.logManagerContext.setLogs(menuContext.logManagerContext.getNewLogs());                
            }
            else {
                menuContext.logManagerContext.activeLog += 1
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