function logManager() {
    var logContext = this;
   
 
    

    
    this.activeLog = 0;
    this.maxLogCount = 0;
   

    this.initialize = function () 
    {
        
   
    };

    this.setLogs = function(valueArray)
    {
        this.maxLogCount = valueArray.length;

        this.allLogs = logInitialize(valueArray);
    }


    //wäre
    this.getNewLogs = function()//customerId o.ä.
    {

        var result = Array(8);
        var counter = 0;
        while(counter < 8)
        {
            result[counter] = Math.floor((Math.random() * 8) + 1);
            counter = counter + 1;

        }
        
        return result;
    }
}


