define(['net/arduinoControl'],

function(arduino){
       function device(solPin,batPin){
       var self = this;
       self.state = 0;

       self.onchange=null;

       arduino.watchPin(solPin,function(pin,val){
                        self.state = (val)?0:1;
                        if(self.onchange) self.onchange();

                        });

       arduino.watchPin(batPin,function(pin,val){
                        self.state = (val)?0:2;
                        if(self.onchange) self.onchange();
                        });
       }

       function Switch(pin){
       var self = this;
       self.state = 0;

       self.onchange=null;

       arduino.watchPin(pin,function(pin,val){
                        self.state = val;
                        if(self.onchange) self.onchange();

                        });
       }

       function hardware(){

       }

       hardware.battery = 0;
       hardware.initCB =null;

       hardware.link = function(cb){
       		arduino.connect(hardware.init);
       		hardware.initCB=cb;
       }

       hardware.init = function(){

           hardware.oxygen = new device(4,5);
           hardware.fan = new device(7,6);
           hardware.food = new device(8,9);
           hardware.comm = new device(10,11);
           hardware.heat = new device(12,13);
           hardware.lights = new device(18,19);

           hardware.language = new device(16,17);
           hardware.difficulty = new Switch(17);

           arduino.analogReport(0,75,function(pin,val){
                                hardware.battery = Math.floor(val/2.55);
                                });
       		if(hardware.initCB) hardware.initCB();
       }

       hardware.sunState = function(mode){
           if(mode) arduino.digitalWrite(3,1);
           else arduino.digitalWrite(3,0);
       }

       return hardware;

       });