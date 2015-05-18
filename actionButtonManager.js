function actionButtonManager() {
    var actionButtonManagerContext = this;  
    
    this.actionButtonCount = 0;
    this.actionButtonMaxCount = 8;
    this.actionButtonX = 0;
    this.actionButtonY = maxHeight / 16 * 11;
    this.spriteList = new Array(25);

    this.initialize = function (stageManagerContext, category) 
    {       
        while (this.actionButtonCount < this.actionButtonMaxCount) {
            if (this.actionButtonCount != 0) {

                if (this.actionButtonCount % 2 == 0) {
                    this.actionButtonY = this.actionButtonY - maxHeight / 16 * 2.5;
                    this.actionButtonX = this.actionButtonX + maxWidth / 5;
                }
                else {
                    this.actionButtonY = this.actionButtonY + maxHeight / 16 * 2.5;
                }
            }
            this.actionButtonCount = this.actionButtonCount + 1;
            var tempActionButton = new actionButton(category + "-" + this.actionButtonCount, stageManagerContext, this.actionButtonX, this.actionButtonY);
            var actionButtonSprite = tempActionButton.sprite;
            stage.addChild(tempActionButton.backgroundSprite);
            stage.addChild(actionButtonSprite);
            stage.addChild(tempActionButton.text);
            this.spriteList[this.actionButtonCount * 1] = tempActionButton.backgroundSprite;
            this.spriteList[this.actionButtonCount * 2] = actionButtonSprite;
            this.spriteList[this.actionButtonCount * 3] = tempActionButton.text;
            
        }
   
    };

    this.reset = function()
    {
        
        actionButtonManagerContext.actionButtonCount = 0;
        actionButtonManagerContext.actionButtonY = maxHeight / 16 * 11;
        actionButtonManagerContext.actionButtonX = 0;

        var spriteListCount = this.spriteList.length;

        var resetCounter = 1;
        while(resetCounter < spriteListCount)
        {
            var resetSprite = this.spriteList[resetCounter];
            
            if(resetSprite != undefined)
            {
                stage.removeChild(resetSprite);
            }
            
            resetCounter = resetCounter + 1;
        }

    }


  


}

