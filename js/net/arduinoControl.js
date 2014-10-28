define(['net/webSockets'],function(wsClient){
       
    function arduino(){
       
    }

    arduino.handlers =[];
       
    arduino.connect = function(cb){
       wsClient.connect(cb);
    }

    arduino.digitalWrite = function(pin,dir){
        wsClient.send("r|digitalWrite("+pin+","+dir+")");
    }

    arduino.watchPin = function(pin,handler){
        wsClient.send("r|watchPin("+pin+")");
    	arduino.handlers[pin] = handler;
    }

    arduino.analogReport = function(pin,interval,handler){
        wsClient.send("r|analogReport("+pin+","+interval+")");
		arduino.handlers[pin] = handler;
    }

    arduino.stopReport = function(pin){
		wsClient.send("r|stopReport("+pin+")");
    }

    arduino.onMessage = function(data){
        var dataRay = data.split(/[\s,()=]+/);
        //console.log(evt.data);
        switch(dataRay[0]){
            case "pinChange":
            case "analogRead":
                if(arduino.handlers[dataRay[1]]) arduino.handlers[dataRay[1]](dataRay[1],dataRay[2]);
                break;
            default:
                //console.log(evt.data);
                break;
        }
    }

    return arduino;
       
});