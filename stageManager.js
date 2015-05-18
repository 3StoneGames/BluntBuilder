function stageManager() {
    var stageManagerContext = this;

    this.initialize = function (customerManagerContext)
    {
        this.customerManagerContext = customerManagerContext;
        this.recipeManager = new recipeManager();
        this.recipeManager.initialize(this.customerManagerContext.getNextCustomer());
       
        this.actionButtonManager = new actionButtonManager();
        this.actionButtonManager.initialize(this, 1);
    };


    this.checkClickedIngredient = function(value)
    {
        var activeRecipeItemEntry = stageManagerContext.recipeManager.allRecipeItems[stageManagerContext.recipeManager.activeRecipeItem]
        
        //check if click is correct
        if (value == activeRecipeItemEntry.value) {
            activeRecipeItemEntry.setTrue();
            
            if (stageManagerContext.recipeManager.checkRecipeComplete()) {
                stageManagerContext.recipeManager.newRecipe(this.customerManagerContext.getNextCustomer());
            }
            else
            {
                stageManagerContext.recipeManager.nextItem();
            }

            stageManagerContext.updateActionButtons(stageManagerContext.recipeManager.activeRecipeItem + 1);
        }
        else {
            activeRecipeItemEntry.setFalse();            
        }

    };

    this.updateActionButtons = function(category)
    {
        
        stageManagerContext.actionButtonManager.reset();
        stageManagerContext.actionButtonManager.initialize(stageManagerContext, category);
    };




}


