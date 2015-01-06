define(['net/AppData', 'net/ControlUI', 'net/Battery', 'net/BatteryPack', 'net/Hardware', 'net/Language', 'net/Sound'], function( AppData, ControlUI, Battery, BatteryPack, hardware, Language, Sound ){

	ControlManager.controls = [];

	function ControlManager( ){

	}

	/* setup() | Setup all controls */
	ControlManager.setupControls = function( ){

        ControlManager.controls.push( new ControlUI("#o2_control", 32, true, 'bubbles') );
        ControlManager.controls.push( new ControlUI("#fan_control", 4, true, 'fan') );

        ControlManager.controls.push( new ControlUI("#food_control", 67, false, 'rustling', $('#food_warning'), AppData.orbit_duration * 3));
        ControlManager.controls.push( new ControlUI("#comm_control", 9, true, 'telecom', $('#comm_warning'), AppData.orbit_duration * 1));
        ControlManager.controls.push( new ControlUI("#heat_control", 15, true, 'cooking', $('#heat_warning'), AppData.orbit_duration * 5));
        ControlManager.controls.push( new ControlUI("#light_control", 3, true, 'lights', $('#lights_warning'), AppData.orbit_duration * 1));

        ControlManager.batteryPack = new BatteryPack("#battery_left", "#battery_right", $('#batteries_depleted'));
        ControlManager.o2Level = new Battery("#o2_level_container", false, $('#oxygen_depleted'), 'male-breathing', 25);
        ControlManager.fanLevel = new Battery("#fan_level", true, $('#circulation_depleted'), 'female-breathing', 50);

        ControlManager.linkHardware();

	}

    /* linkHardware() | Connect hardware functions to front-end*/
    ControlManager.linkHardware = function( ) {

        hardware.link( function(){

                        hardware.oxygen.onchange = function(){ControlManager.setControlState("o2_control", this.state); console.log("State:" + this.state)};
                        hardware.fan.onchange = function(){ControlManager.setControlState("fan_control", this.state)};
                        hardware.food.onchange = function(){ControlManager.setControlState("food_control", this.state)};
                        hardware.comm.onchange = function(){ControlManager.setControlState("comm_control", this.state)};
                        hardware.heat.onchange = function(){ControlManager.setControlState("heat_control", this.state)};
                        hardware.lights.onchange = function(){ControlManager.setControlState("light_control", this.state)};

                        hardware.language.onchange = function(){Language.setLanguage(Language.convertState(this.state))};
                        hardware.difficulty.onchange = function(){ControlManager.setDifficulty(this.state)};

                        hardware.update();

                      });

        setInterval(ControlManager.checkBatteries, 1000);
        setInterval(ControlManager.checkAuxiliaryEquipment, 1000);

    }

    var batteryGood = true;
    var incTimeout = null;

    ControlManager.incrementUp = function(){
        if(AppData.currentPowerLevel<hardware.battery){
            AppData.currentPowerLevel++;
            clearTimeout(incTimeout);
            incTimeout=setTimeout(ControlManager.incrementUp,500);
            ControlManager.batteryPack.updatePackLevel( AppData.currentPowerLevel );
        }
    }

    ControlManager.checkBatteries = function( ) {

        var reading = hardware.battery;
        var prevReading = AppData.currentPowerLevel;

        //AppData.currentPowerLevel = reading;
        //ControlManager.batteryPack.updatePackLevel( AppData.currentPowerLevel );

        if (AppData.solarAvailable&&!hardware.batteryState) {
            hardware.enableBattery();
        }
        else if(!hardware.batteryState){
            reading=0;
        }

        if(AppData.solarAvailable) ControlManager.incrementUp();
        else if(reading<prevReading) AppData.currentPowerLevel = reading;

        ControlManager.batteryPack.updatePackLevel( AppData.currentPowerLevel );

        //Update displays if there batteries have changed to or from an empty state
        /*if (prevReading > 0 && reading <= 0){
            ControlManager.refreshControlDisplays();
        } else if (prevReading <= 0 && reading > 0){
            ControlManager.refreshControlDisplays();
        }*/
        if((batteryGood&&!reading)||(!batteryGood&&reading)){
            ControlManager.refreshControlDisplays();
            ControlManager.batteryPack.warningState=(reading>25);
            ControlManager.batteryPack.deadState=(reading>0);
            ControlManager.batteryPack.refreshText();
            batteryGood=reading;
        }

    }

    ControlManager.checkAuxiliaryEquipment = function( ) {

        for (var i = 0; i < ControlManager.controls.length; i++) {

            ControlManager.controls[i].checkFailureTimeout();

        };

    }

	/* getControlById() | Setup the state of a specific control by id */
	ControlManager.getControlById = function( controlId ) {

		var control = {};
		for (var i = 0; i < ControlManager.controls.length; i++) {

			if ( ControlManager.controls[i].id == controlId ) {

				control = ControlManager.controls[i];

				break;

			}

		};

		return control;

	}

    /* setSolarAvailable() */
    ControlManager.setSolarAvailable = function( value ) {

        AppData.setSolarAvailable(value);

        hardware.sunState(+value);//0 or 1

        this.refreshControlDisplays();

    }

	/* setControlState() | Set state of specific control */
	ControlManager.setControlState = function( controlId, stateId ) {

		ControlManager.getControlById( controlId ).setState( stateId );

        if (controlId == 'o2_control' || controlId == 'fan_control') {

            this.refreshFillBars();

        }

	}

    /* refreshControlDisplays() | Refresh all control displays against current states */
    ControlManager.refreshControlDisplays = function( ) {

        for (var i = 0; i < this.controls.length; i++) {

            this.controls[i].refreshStateDisplay();

        };

        this.refreshFillBars();

    }

    /* refreshFillBars() | Start filling or depleting fill bars based on current state */
    ControlManager.refreshFillBars = function( ) {

        var c = ControlManager.getControlById( 'o2_control' );

        if (c.isActive){
            this.o2Level.timedFill( AppData.o2_fill_rate, AppData.o2_update_rate );
        }else{
            this.o2Level.timedFill( AppData.o2_depletion_rate, AppData.o2_update_rate );
        }

        c = this.getControlById( 'fan_control' );

        if (c.isActive){
            this.fanLevel.timedFill( AppData.circulation_fill_rate, AppData.circulation_update_rate );
        }else{
            this.fanLevel.timedFill( AppData.circulation_depletion_rate, AppData.circulation_update_rate );
        }

    }

    /* setDifficulty() | Update control states and levels based on new difficulty */
    ControlManager.setDifficulty = function( value ){

        //temp
        if(value>1)value=1;

        AppData.setDifficulty( value );

        if (value==AppData.DIFFICULTY_EASY) {
            //enable batteries
            this.batteryPack.setFailStates( false, false );
        } else {
            //disable right-side battery
            this.batteryPack.setFailStates( false, true );
        }

    };


	return ControlManager;

});