function logManager() {
    var logContext = this;
   
 
    

    
    this.activeLog = 0;
    this.maxLogCount = 8;
   

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
        
        var result = Array(this.maxLogCount);
        var counter = 0;
        while(counter < this.maxLogCount)
        {
            result[counter] = Math.floor((Math.random() * this.maxLogCount) + 1);
            counter = counter + 1;

        }
        
        return result;
    }
}


