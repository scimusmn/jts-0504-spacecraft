define([], function(){


    function AppData(){

    }

    //Constants
    AppData.ORBIT_CYCLE_TIME = 30; // Secs it take for complete obit around Earth
	
    AppData.updateSettings = function(configXML){
    
    	this.configXML = configXML;
    	
    	this.developerMode = ($(this.configXML).find('setting[id=developerMode]').attr('value') == "true");
    	
    	//how to set string setting
//    	this.EXAMPLE_SETTING = $(this.configXML).find('setting[id=EXAMPLE_SETTING_ID]').attr('value');
    	
        //Setup Global Vars 
        this.currentStateId = '';
        this.solarAvailable = true;

        this.currentPowerLevel = 100;

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

    return AppData;
    
});