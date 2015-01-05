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

       self.update = function(){
          arduino.digitalRead(solPin);
          arduino.digitalRead(batPin);
       }
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
       hardware.batteryState = false;
       hardware.initCB =null;

       hardware.link = function(cb){
       		arduino.connect(hardware.init);
       		hardware.initCB=cb;
          hardware.sunState(1);
       }

       hardware.batteryInt =null;

       hardware.switchTime = Date.now();

       hardware.disableBattery = function(){
        if(hardware.batteryState){
          hardware.switchTime = Date.now();
          arduino.digitalWrite(2,1);
          hardware.batteryState=false;
        }
       }

       hardware.enableBattery = function(){
          if(Date.now()-hardware.switchTime>2000&&!hardware.batteryState){
              hardware.batteryState=true;
              arduino.digitalWrite(2,0);
          }
       }

       hardware.update = function(){
          hardware.oxygen.update();
           hardware.fan.update();
           hardware.food.update();
           hardware.comm.update();
           hardware.heat.update();
           hardware.lights.update(); 
       }

       hardware.init = function(){

           hardware.oxygen = new device(5,4);
           hardware.fan = new device(7,6);
           hardware.food = new device(9,8);
           hardware.comm = new device(11,10);
           hardware.heat = new device(13,12);
           hardware.lights = new device(19,18);

           hardware.language = new Switch(16);
           hardware.difficulty = new Switch(17);

           /*arduino.analogReport(0,75,function(pin,val){
                                console.log(val);
                                hardware.battery = Math.floor((val-500)/3);
                                if(hardware.battery <= 0) {
                                  hardware.disableBattery();
                                }
                                else if (hardware.battery>=20){
                                  hardware.enableBattery();
                                }
                                });*/
          arduino.setHandler(0,function(pin,val){
                                console.log(val);
                                hardware.battery = Math.floor((val-375)/3.125);
                                if(hardware.battery <= 0) {
                                  hardware.disableBattery();
                                }
                                else if (hardware.battery>=20){
                                  //hardware.enableBattery();
                                }
                                });
          hardware.batteryInt = setInterval(function(){
                arduino.analogRead(0);
          },500);
          
       		if(hardware.initCB) hardware.initCB();
       }
       
       var sunLevel = 100;
       var snState = true;
       var sunInt = null;

       hardware.sunState = function(mode){
       		snState=mode;
       		setTimeout(hardware.rampSun,10);
       }
       
       hardware.rampSun = function(){
           if(snState&&sunLevel<255){
           		arduino.analogWrite(3,sunLevel++);
       			console.log(sunLevel);
           		if(sunLevel<255) setTimeout(hardware.rampSun,10);
           }
           else if(!snState&&sunLevel>100){
           		arduino.analogWrite(3,sunLevel--);
       			console.log(sunLevel);
           		if(sunLevel>100) setTimeout(hardware.rampSun,10);
           }
       }

       return hardware;

       });