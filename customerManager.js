function customerManager() {
    var customerManagerContext = this;
    this.CustomerServedCount = 0;
    this.initialize = function () //wahrscheinlich würd man hier noch das lvl reingeben
    {
        this.customers = this.getCustomers();
    };

    // gibt ein array an customers zurück
    // ein customer ist ein array mit
    //0 = zeit wann der cstomer erscheint
    //1 = array über:art des zu drückenden + - + nummer
    this.getCustomers = function()//wahrscheinlich würd man hier noch das lvl reingeben
    {
        //check das lvl und dann
        var levelCustomerMaxCount = 3;
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
            result[customerCount].initialize(customerCount, 60-customerCount, ingredients);
            customerCount = customerCount+1;
        }

        
        return result;            
    };

    this.getNextCustomer = function()
    {
        var customerCount = customerManagerContext.customers.length;
        if(customerCount > 0)
        {
            var ingredients = customerManagerContext.customers[this.CustomerServedCount].Ingredients;
            var ingredientsCount = ingredients.length;
            var result = Array(ingredientsCount);

            var count = 0;
            while(count < ingredientsCount)
            {
                var temp = ingredients[count];
                result[count] = temp.split('-')[1]
                count = count+1;
            }
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


}


