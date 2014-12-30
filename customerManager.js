function customerManager() {
    var customerManagerContext = this;
    this.CustomerServedCount = 0;
    this.CustomerSpawnedCount = 0;

    this.initialize = function () //wahrscheinlich würd man hier noch das lvl reingeben
    {
        this.Customers = this.getCustomers();
        this.SpawnedCustomers = Array(this.Customers.length)
    };

    // gibt ein array an customers zurück
    // ein customer ist ein array mit
    //0 = zeit wann der cstomer erscheint
    //1 = array über:art des zu drückenden + - + nummer
    this.getCustomers = function()//wahrscheinlich würd man hier noch das lvl reingeben
    {
        //check das lvl und dann
        var levelCustomerMaxCount = 30;
        var result = Array(levelCustomerMaxCount);
        var customerCount = 0;
        var ingredientsCount = 8;

        while(customerCount < levelCustomerMaxCount)
        {         
            var ingredients = Array(ingredientsCount);

            var count = 0;
            
            while(count < ingredientsCount)
            {
                ingredients[count] = count + '-' + Math.floor((Math.random() * 8) + 1);//art des zu drückenden + - + nummer 
                count = count+1;
            }            

            result[customerCount] = new customer();
            result[customerCount].initialize(customerCount, 60-customerCount*3, ingredients);
            customerCount = customerCount+1;
        }

        
        return result;            
    };

    this.getNextCustomer = function()
    {
        var customerCount = customerManagerContext.Customers.length;
        if(customerCount > 0)
        {
            if(this.CustomerServedCount >= 1)
            {
                var servedCustomerEntry = customerManagerContext.Customers[this.CustomerServedCount - 1];
                if(servedCustomerEntry != undefined)
                {
                    servedCustomerEntry.setServed();
                }
            }

            var customerEntry = customerManagerContext.Customers[this.CustomerServedCount];
            console.log(customerEntry.SpawnTime);
            var ingredients = customerEntry.Ingredients;
            var ingredientsCount = ingredients.length;
            var result = Array(ingredientsCount);

            var count = 0;
            while(count < ingredientsCount)
            {
                var temp = ingredients[count];
                result[count] = temp.split('-')[1]
                count = count+1;
            }
            this.SpawnedCustomers[this.CustomerServedCount] = customerEntry;
            console.log(this.SpawnedCustomers[this.CustomerServedCount]);
            this.CustomerServedCount = this.CustomerServedCount + 1;
            console.log(result);
           

            return result;

        }
        else 
        {
            return Array(1);
        }
        //return false;
        //kommt jetzt ein einfaches array mit den nummern zurücl
        //würde später ein vollständiger customer und seine kategorien/art des zu drückenden
    };

    this.animate = function(timeLeft)
    {
        var customerCount = customerManagerContext.Customers.length;
        
        if(customerCount > 0)
        {
            var count = this.CustomerSpawnedCount;

            while(count < customerCount)
            {
                var customerEntry = customerManagerContext.Customers[count];
                if(customerEntry == undefined)
                {
                    console.log("no customer found, return (customer manager : animate)");
                    return true;
                }
                    

                if(customerEntry.SpawnTime > timeLeft)
                {
                    customerManagerContext.SpawnedCustomers[count] = customerEntry;
                    customerEntry.spawn();
                    this.CustomerSpawnedCount = this.CustomerSpawnedCount + 1;
                    console.log("added" + count);
                }
                count = count + 1;

            }
        }

        var spawnedCustomerCount = customerManagerContext.SpawnedCustomers.length;
        
    }


}


