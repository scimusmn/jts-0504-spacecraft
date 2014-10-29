define(['net/webSockets'],function(wsClient){
       
    function arduino(){
       
    }

    arduino.handlers =[];

    arduino.onMessage = function(evt){
        var dataRay = evt.data.split(/[\s|,()=]+/);
        switch(dataRay[1]){
            case "pinChange":
            case "analogRead":
                if(arduino.handlers[parseInt(dataRay[2])]) arduino.handlers[parseInt(dataRay[2])](parseInt(dataRay[2]),parseInt(dataRay[3]));
                break;
            default:
                break;
        }
    }

    arduino.connect = function(cb){
       wsClient.setMsgCallback(arduino.onMessage);
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

    return arduino;
       
});