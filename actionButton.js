function actionButton(idIn, stageManagerContextIn, positionXIn, positionYIn) {
    this.stageManagerContext = stageManagerContextIn;

    var actionButtonContext = this;
    this.id = idIn;
    this.positionX = positionXIn;
    this.positionY = positionYIn;
    this.width = maxWidth / 5;
    this.height = maxHeight / 16 * 2.5;



    this.sprite = generateButtonFromPath(gameManager.imageRootPath + "actionButtonBorder.png", this.positionX, this.positionY, this.width, this.height); 
    this.clickedSprite =  generateSpriteFromPath(gameManager.imageRootPath + "actionButton_active.png", this.positionX, this.positionY, this.width, this.height); 
    this.backgroundSprite = generateSpriteFromPath(gameManager.imageRootPath + "items/item" + this.id + ".jpg", this.positionX, this.positionY, this.width, this.height);


    this.text = new PIXI.Text(this.id + "", { font: "bold italic " + gameManager.fontDefault * 0.9 + "px Arial", fill: "#3e1707", align: "center", stroke: "#a2210e", strokeThickness: 7 });

    this.text.position.x = this.positionX + this.sprite.width / 2.4;
    this.text.position.y = this.positionY + this.sprite.height / 3;
 

    if(!!('ontouchstart' in window))
    {
        this.sprite.touchstart = function (event) {
            actionButtonClickedEvent();       
        }
    }
    else
    {
        this.sprite.mousedown = function (event) {
            actionButtonClickedEvent();       
        }
    }
    

    function actionButtonClickedEvent(){
        stage.addChild(actionButtonContext.clickedSprite);
        actionButtonContext.stageManagerContext.checkClickedIngredient(actionButtonContext.id);
    }

    this.sprite.mouseup = this.sprite.touchend = function (data) {
        var hasChild = stage.children.indexOf( actionButtonContext.clickedSprite ) !== -1;
        if(hasChild)
        {
            stage.removeChild(actionButtonContext.clickedSprite);
        }
        
    }

    this.sprite.mouseout = function (data) {
        var hasChild = stage.children.indexOf( actionButtonContext.clickedSprite ) !== -1;
        if(hasChild)
        {
            stage.removeChild(actionButtonContext.clickedSprite);
        }
    }

}

