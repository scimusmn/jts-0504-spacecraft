define(['net/AppData', 'net/arduinoControl'],

function(AppData, arduino) {
  function Device(solPin, batPin) {
    if (AppData.invertedSwitches) {
      var temp = batPin;
      batPin = solPin;
      solPin = temp;
    }

    var _this = this;
    _this.state = 0;

    _this.onchange = null;

    arduino.watchPin(solPin, function(pin, val) {
      _this.state = (val) ? 0 : 1;
      if (_this.onchange) _this.onchange();

    });

    arduino.watchPin(batPin, function(pin, val) {
      _this.state = (val) ? 0 : 2;
      if (_this.onchange) _this.onchange();
    });

    _this.update = function() {
      arduino.digitalRead(solPin);
      arduino.digitalRead(batPin);
    }
  }

  function Switch(pin) {
    var _this = this;
    _this.state = 0;

    _this.onchange = null;

    arduino.watchPin(pin, function(pin, val) {
      _this.state = val;
      if (_this.onchange) _this.onchange();

    });
  }

  function hardware() {

  }

  hardware.battery = 0;
  hardware.batteryState = false;
  hardware.initCB = null;

  hardware.link = function(cb) {
    arduino.connect(hardware.init);
    hardware.initCB = cb;
    hardware.sunState(1);
  };

  hardware.batteryInt = null;

  hardware.switchTime = Date.now();

  hardware.disableBattery = function() {
    if (hardware.batteryState) {
      hardware.switchTime = Date.now();
      arduino.digitalWrite(2, 1);
      hardware.batteryState = false;
    }
  };

  hardware.enableBattery = function() {
    if (Date.now() - hardware.switchTime > 2000 && !hardware.batteryState) {
      hardware.batteryState = true;
      arduino.digitalWrite(2, 0);
    }
  };

  hardware.update = function() {
    hardware.oxygen.update();
    hardware.fan.update();
    hardware.food.update();
    hardware.comm.update();
    hardware.heat.update();
    hardware.lights.update();
  };

  hardware.init = function() {

    hardware.oxygen = new Device(5, 4);
    hardware.fan = new Device(7, 6);
    hardware.food = new Device(9, 8);
    hardware.comm = new Device(11, 10);
    hardware.heat = new Device(13, 12);
    hardware.lights = new Device(19, 18);

    hardware.language = new Switch(16);
    hardware.difficulty = new Switch(17);

    arduino.setHandler(0, function(pin, val) {
      hardware.battery = Math.floor((val - AppData.batteryOffset) / AppData.batteryScale);
      if (hardware.battery <= 0) {
        hardware.disableBattery();
      } else if (hardware.battery >= 20) {
        // TODO: figure out why this is empty
        //hardware.enableBattery();
      }
    });

    hardware.batteryInt = setInterval(function() {
      arduino.analogRead(0);
    }, 500);

    if (hardware.initCB) hardware.initCB();
  };

  var sunLevel = 100;
  var snState = true;
  var sunInt = null;

  hardware.sunState = function(mode) {
    snState = mode;
    setTimeout(hardware.rampSun, 10);
  };

  hardware.rampSun = function() {
    if (snState && sunLevel < 255) {
      arduino.analogWrite(3, sunLevel++);
      if (sunLevel < 255) setTimeout(hardware.rampSun, 10);
    } else if (!snState && sunLevel > 100) {
      arduino.analogWrite(3, sunLevel--);
      if (sunLevel > 100) setTimeout(hardware.rampSun, 10);
    }
  };

  return hardware;

});
