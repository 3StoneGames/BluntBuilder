function customer() {   
   

    this.initialize = function (customerId, spawnTime, ingredients) 
    {
        this.Id = customerId;
        this.SpawnTime = spawnTime;        
        this.Ingredients = ingredients;
        this.Served = false;
   
    };

    this.SetServed = function()
    {
        this.Served = true;
    };


}


