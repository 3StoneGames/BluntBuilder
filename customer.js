function customer() {   
   

    this.initialize = function (customerId, spawnTime, ingredients) 
    {
        this.Id = customerId;
        this.SpawnTime = spawnTime;    
        this.Spawned = false;    
        this.Ingredients = ingredients;
        this.Served = false;   
        this.NormalSprite = generateSpriteFromPath(gameManager.imageRootPath + "customer.png", (this.Id + 1) * 20, (maxHeight / 16 * 11) - 20, 10, 10);
        this.ServedSprite = generateSpriteFromPath(gameManager.imageRootPath + "customer_served.png", (this.Id + 1) * 20, (maxHeight / 16 * 11)-20, 10, 10);
   
    };

    this.setServed = function()
    {
        this.Served = true;
        stage.removeChild(this.NormalSprite);
        console.log("removed");
        
        stage.addChild(this.ServedSprite);
    };

    this.spawn = function()
    {
        console.log("spawn");
        stage.addChild(this.NormalSprite);
    }

}


