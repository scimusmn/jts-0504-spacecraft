function random (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

function dummyDev(num){
    var self = this;
    self.pin =num;
    self.state=0;
    self.bound = null;
    self.timer = null;
    var oldDevState = 0;
    var oldState=0;
    self.onChange =null;
    
    self.toggle=function(){
        var newState = random(0,3);
        while (newState==oldDevState) newState = random(0,3);
        self.state=newState%2;
        if(self.bound){
            self.bound.state=((newState==2)?1:0);
            self.bound.checkChange();
        }
        self.checkChange();
        self.timer = setTimeout(self.toggle,random(7000,30000));
        oldDevState=newState;
    }
    
    self.checkChange = function(){
        if(self.onChange&&oldState!=self.state) self.onChange(self),oldState=self.state;
    }
    
    self.bind=function(tie){
        self.bound=tie;
        tie.bound=self;
        clearTimeout(tie.timer);
    }
    
    self.timer = setTimeout(self.toggle,random(7000,30000));
}

var dummyParse = new function(){
    var self = this;
    var pins = [];
    self.lights =1;
    var analogInt = null;
    self.battLevel =0;
    
    function setup(){
        for(var i=0; i<20; i++){
            pins[i] = new dummyDev(i);
        }
        for(var i=2; i<20; i+=2){
            pins[i].bind(pins[i+1]);
        }
    }
    
    setup();
    
    var onChange = function(dev){
        if(webSock) webSock.send("r|pinChange("+dev.pin+","+dev.state+")");
        console.log("pinChange("+dev.pin+","+dev.state+")");
    }
    
    self.fakeBattery = function(){
        if(self.lights>0){
            if(self.battLevel++>=1023) self.battLevel=1023;
        }
        else if((self.battLevel-=3)<=0) self.battLevel=0;
        if(webSock) webSock.send("r|analogRead(0)="+self.battLevel);
    }
    
    self.parse = function(message){
        var spl = message.split(/[\s,()=]+/);
        switch (spl[0]){
            case "watchPin":
                pins[parseInt(spl[1])].onChange = onChange;
                console.log("watching pin "+spl[1]);
                break;
            case "digitalWrite":
                self.lights = spl[2];
                console.log(self.lights);
                break;
            case"analogReport":
                analogInt = setInterval(self.fakeBattery.bind(this),parseInt(spl[2]));
                console.log("Reporting battery");
                break;
            default:
                break;
        }
    }
}

//dummyParse.parse("watchPin(2)");

/*******************************************
// For websockets, require 'ws'.Server
********************************************/


var WebSocketServer = require('ws').Server, wss = new WebSocketServer({port: 8080});

//Tell the wsServer what to do on connnection to a client; 

var webSock = null;
var sp = null;

wss.on('connection', function(ws) {
	
	webSock = ws;
	
    ws.on('message', function(message) {
    	var data = message.split("|");
        switch(data[0]){
        	case "c":
        		for(var i in wss.clients){
        			wss.clients[i].send(message);
        			console.log(i);
        		}
        		break;
        	case "r":
        		//if(sp) sp.write(data[1]+"|");
          		console.log(data[1]);
          		dummyParse.parse(data[1]);
        		break;
			default:
				
				break;
		}
    });
	
	ws.on('close',function(){
		webSock=null;
	});

	ws.on('error',function(error){
		webSock=null;
		console.log("Error: "+error);
	});
	
});

////////////////////////////////////////////////////////
// Use the library                                    //
// git://github.com/voodootikigod/node-serialport.git //
// to read the serial port where arduino is sitting.  //
////////////////////////////////////////////////////////               
/*var com = require("serialport");
var bufSize = 512;

sp = new com.SerialPort("/dev/cu.usbmodemfd121", {
    baudrate: 9600,
    parser: com.parsers.readline('\r\n'),
    buffersize:bufSize
  });

sp.on('open',function() {
  sp.on('data', function(data) {
    if(webSock) webSock.send("r|"+data);
  });

});*/