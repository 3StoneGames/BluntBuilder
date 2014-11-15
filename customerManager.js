function customerManager() {
    
    this.initialize = function () //wahrscheinlich würd man hier noch das lvl reingeben
    {
        this.customers = this.getCustomers();
    };

    this.getCustomers = function()//wahrscheinlich würd man hier noch das lvl reingeben
    {
        //check das lvl und dann
        var levelCustomerMaxCount = 3;
        var result = Array(levelCustomerMaxCount);
        var customerCount = 0;
        var ingredientsCount = 0;

        while(customerCount < levelCustomerMaxCount)
        {
            var customer = Array(2)

           
            customer[0] = '50'; //zeit des customers



            customer[1] = ''+ count  + ';' + Math.floor((Math.random() * 8) + 1);//art des zu drückenden + ; + nunner 

            result[count] = customer;

            count = count+1;
        }

        
        return result;            
    };


}


