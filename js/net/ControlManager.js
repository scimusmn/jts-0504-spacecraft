define(['net/AppData', 'net/ControlUI', 'net/Battery'], function( AppData, ControlUI, Battery ){

	//Constants
	ControlManager.ENGLISH = 'en';
	ControlManager.SPANISH = 'es';

	ControlManager.controls = [];

	function ControlManager( ){

	}

	/**
	 * @brief [brief description]
	 * @details [long description]
	 * @return [description]
	 */

	/* setup() | Setup all controls */
	ControlManager.setupControls = function( ){


        ControlManager.controls.push( new ControlUI("#o2_control", 32, true) );
        ControlManager.controls.push( new ControlUI("#fan_control", 4, true) );

        ControlManager.controls.push( new ControlUI("#food_control", 67, false) );
        ControlManager.controls.push( new ControlUI("#comm_control", 9, true) );
        ControlManager.controls.push( new ControlUI("#heat_control", 15, true) );
        ControlManager.controls.push( new ControlUI("#light_control", 3, true) );

        ControlManager.o2Level = new Battery("#o2_level_container");
        ControlManager.fanLevel = new Battery("#fan_level");

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

	/* setControlState() | Setup the state of a specific control by id */
	ControlManager.setControlState = function( controlId, stateId ) {
		console.log( "setControlState:" + controlId, stateId );
		ControlManager.getControlById( controlId ).setState( stateId );

	}


	return ControlManager;

});