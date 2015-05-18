function recipeManager() {
    var recipeManagerContext = this;  
     
    this.activeRecipeItem = 0;
    this.maxRecipeItemCount = 6;
    

    this.initialize = function (values) 
    {
        this.newRecipe(values);
    };

    this.setRecipeItems = function(valueArray)
    {
        //this.maxRecipeItemCount = valueArray.length;
        this.allRecipeItems = this.initializeRecipeItems(valueArray);
    }

    this.newRecipe = function(values)
    {
        
        recipeManagerContext.setRecipeItems(values);
        recipeManagerContext.activeRecipeItem = 0;
    }

    this.nextItem = function()
    {
        recipeManagerContext.activeRecipeItem += 1     
        
    }

    this.getActiveItem = function()
    {
        return recipeManagerContext.allRecipeItems[recipeManagerContext.activeRecipeItem];        
    }

    
    this.initializeRecipeItems = function(valueArray)
    {
        var recipeItemCount = 0;
        var recipeItemMaxCount = valueArray.length;

        var recipeItemX = maxWidth / 5 * 4;
        var recipeItemY = maxHeight / 16 * 2.5;
        var resultArray = new Array(recipeItemMaxCount);
        
        //code für darstellung des recipeItems
        while (recipeItemCount < recipeItemMaxCount) {
            if (recipeItemCount != 0) {

                if (recipeItemCount % 2 == 0) {
                    recipeItemX = recipeItemX - maxWidth / 10;
                    recipeItemY = recipeItemY + maxHeight / 16 * 2;
                }
                else {
                    recipeItemX = recipeItemX + maxWidth / 10;
                    
                }
            }
            var value = valueArray[recipeItemCount];
            var temprecipeItem = new recipeItem(recipeItemCount + 1, value, recipeItemX, recipeItemY);
            resultArray[recipeItemCount] = temprecipeItem;
            var recipeItemFrameSprite = temprecipeItem.frameSprite;
            var recipeItemIndicatorSprite = temprecipeItem.indicatorSprite;
            stage.addChild(temprecipeItem.backgroundSprite);
            stage.addChild(recipeItemFrameSprite);
            //stage.addChild(recipeItemIndicatorSprite);
            
            //stage.addChild(temprecipeItem.text);
            recipeItemCount = recipeItemCount + 1;
        }

        return resultArray;
    }

    this.checkRecipeComplete = function()
    {
        if(this.activeRecipeItem + 1 == this.maxRecipeItemCount)
        {
            return true;
        }
        else
        {
            return false;
        }
    }


}

