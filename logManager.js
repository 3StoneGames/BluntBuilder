function logManager() {
    var logContext = this;  
     
    this.activeLog = 0;
    this.maxLogCount = 8;
    

    this.initialize = function (customerManagerContext) 
    {
        this.CustomerManagerContext = customerManagerContext;
        var values = this.getNewLogs();//hier wird er dann "GetNextCustomer" machen    
        this.setLogs(values);
   
    };

    this.setLogs = function(valueArray)
    {
        this.maxLogCount = valueArray.length;
        this.allLogs = this.initializeLogs(valueArray);
    }


    //wäre
    this.getNewLogs = function()//customerId o.ä.
    {

        return this.CustomerManagerContext.getNextCustomer();

        /*
        var result = Array(this.maxLogCount);
        var counter = 0;
        while(counter < this.maxLogCount)
        {
            result[counter] = Math.floor((Math.random() * this.maxLogCount) + 1);
            counter = counter + 1;

        }
        
        return result;*/
    }

    this.initializeLogs = function(valueArray)
    {
        var logCount = 0;
        var logMaxCount = valueArray.length;

        var logX = maxWidth / 5 * 4;
        var logY = maxHeight / 16 * 2.5;
        var resultArray = new Array(logMaxCount);
        
        while (logCount < logMaxCount) {
            if (logCount != 0) {

                if (logCount % 2 == 0) {
                    logX = logX - maxWidth / 10;
                    logY = logY + maxHeight / 16 * 2;
                }
                else {
                    logX = logX + maxWidth / 10;
                    
                }
            }
            var value = valueArray[logCount];
            var templog = new log(logCount + 1, value, logX, logY);
            resultArray[logCount] = templog;
            var logFrameSprite = templog.frameSprite;
            var logIndicatorSprite = templog.indicatorSprite;
            stage.addChild(templog.backgroundSprite);
            stage.addChild(logFrameSprite);
            //stage.addChild(logIndicatorSprite);
            
            //stage.addChild(templog.text);
            logCount = logCount + 1;
        }

        return resultArray;
    }


}

