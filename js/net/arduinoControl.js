define(['net/webSockets'],function(wsClient){
       
    function arduino(){
       //wsClient.connect();
    }

    arduino.handlers =[];
       
    arduino.connect = function(){
       wsClient.connect();
    }

    arduino.digitalWrite = function(pin,dir){
        wsClient.send("r|digitalWrite("+pin+","+dir+")");
    }

    arduino.watchPin = function(pin,handler){
        wsClient.send("r|watchPin("+pin+")");
    	arduino.handlers[pin] = handler;
    }

    arduino.analogReport = function(pin,interval,handler){
        webSockClient.send("r|analogReport("+pin+","+interval+")");
		self.handlers[pin] = handler;
    }

    arduino.stopReport = function(pin){
		webSockClient.send("r|stopReport("+pin+")");
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