define(['net/arduinoControl'],
       
function(arduino){
    
    function device(solPin,batPin){
        device.state = 0;
        
        device.onchange=null;
        
        arduino.watchPin(solPin,function(pin,val){
                         	device.state = (val)?0:1;
                         	if(device.onchange) device.onchange();
                         });
        
        arduino.watchPin(batPin,function(pin,val){
                         	device.state = (val)?0:2;
                         	if(device.onchange) device.onchange();
                         });
    }

    function hardware(){
        
    }
    
    hardware.battery = 0;

    hardware.link = function(){
		arduino.connect();
        
        hardware.oxygen = new device(2,3);
        hardware.fan = new device(4,5);
        hardware.food = new device(6,7);
        hardware.comm = new device(8,9);
        hardware.heat = new device(19,18);
        hardware.lights = new device(17,16);
        
        arduino.analogReport(0,250,function(pin,val){
                             	hardware.battery = Math.floor(val/4);
                             });
    }
    
    hardware.sunState = function(mode){
        if(mode) arduino.digitalWrite(13,1);
        else arduino.digitalWrite(13,0);
    }

    return hardware;

});