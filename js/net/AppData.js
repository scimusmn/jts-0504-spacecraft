define([], function(){


    function AppData(){

    }

    //Constants
    AppData.ORBIT_CYCLE_TIME = 9; // Secs it take for complete obit around Earth
    AppData.SHADOW_ENTER_ANGLE = 136; // Angle space-station enters shadow
    AppData.SHADOW_EXIT_ANGLE = 275; // Angle space-station exits shadow

    AppData.DIFFICULTY_EASY = 0;
    AppData.DIFFICULTY_HARD = 1;

    AppData.updateSettings = function(configXML){

    	this.configXML = configXML;

    	this.developerMode = ($(this.configXML).find('setting[id=developerMode]').attr('value') == "true");

    	//how to set string setting
//    	this.EXAMPLE_SETTING = $(this.configXML).find('setting[id=EXAMPLE_SETTING_ID]').attr('value');


        //Global Vars
        this.currentStateId = '';
        this.solarAvailable = true;

        this.currentPowerLevel = 100;
        this.currentDifficulty = AppData.DIFFICULTY_EASY;

    };

    AppData.setCurrentState = function(stateId){

    	this.currentStateId = stateId;

    };

    AppData.setSolarAvailable = function( value ){

        this.solarAvailable = value;

    };

    AppData.getSolarAvailable = function( ){

        return this.solarAvailable;

    };

    AppData.setDifficulty = function( value ){

        this.currentDifficulty = value;

    };

    AppData.getDifficulty = function( ){

        return this.currentDifficulty;

    };

    return AppData;

});