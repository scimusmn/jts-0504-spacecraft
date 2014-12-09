define([], function(){


    function AppData(){

    }

    //Constants
    AppData.SHADOW_ENTER_ANGLE = 136; // Angle space-station enters shadow
    AppData.SHADOW_EXIT_ANGLE = 275; // Angle space-station exits shadow

    AppData.DIFFICULTY_EASY = 0;
    AppData.DIFFICULTY_HARD = 1;

    //Colors
    AppData.WARNING_RED = "#cb242c";
    AppData.GO_GREEN = "#cb242c";


    AppData.updateSettings = function(configXML){

    	this.configXML = configXML;

        //Settings from xml.
    	this.developerMode = this.getBool('developerMode');
        this.orbit_duration = this.getInt('orbit_duration');
        this.o2_fill_rate = this.getFloat('o2_fill_rate');
        this.o2_depletion_rate = this.getFloat('o2_depletion_rate');
        this.circulation_fill_rate = this.getFloat('circulation_fill_rate');
        this.circulation_depletion_rate = this.getFloat('circulation_depletion_rate');

        //Global Vars
        this.currentStateId = '';
        this.solarAvailable = true;

        this.currentPowerLevel = 100;
        this.currentDifficulty = AppData.DIFFICULTY_EASY;

    };

    AppData.getInt = function(id){
        return parseInt( this.getSetting(id) );
    }

    AppData.getFloat = function(id){
        return parseFloat( this.getSetting(id) );
    }

    AppData.getBool = function(id){
        return (this.getSetting(id) == "true");
    }

    AppData.getSetting = function(id){
        return $(this.configXML).find('setting[id='+id+']').attr('value');
    }

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