define(['net/Language', 'net/ControlManager', 'net/ControlUI', 'net/AppData'], function(Language, ControlManager, ControlUI, AppData){

	function Keyboard( ){

	}

	//constant method
	Keyboard.init = function(){

		jwerty.key('1', function () { Language.setLanguage( Language.ENGLISH ); });
		jwerty.key('2', function () { Language.setLanguage( Language.SPANISH ); });

		jwerty.key('3', function () { ControlManager.setDifficulty( AppData.DIFFICULTY_EASY ); });
		jwerty.key('4', function () { ControlManager.setDifficulty( AppData.DIFFICULTY_HARD ); });

		// $("#backdrop_vid").css('opacity', 0);//temp
		// jwerty.key('4', function () { $("#backdrop_vid").show().fadeTo('slow', 0.0 )});
		// jwerty.key('5', function () { $("#backdrop_vid").show().fadeTo('slow', 0.6 )});
		// jwerty.key('6', function () { $("#backdrop_vid").insertBefore("#orbit_display"); $('#backdrop_vid').get(0).play(); });
		// jwerty.key('7', function () { $("#backdrop_vid").insertBefore("#window_power"); $('#backdrop_vid').get(0).play(); });

		jwerty.key('q', function () { ControlManager.setControlState('o2_control', ControlUI.STATE_ACTIVE ); });
		jwerty.key('w', function () { ControlManager.setControlState('o2_control', ControlUI.STATE_OFF ); });
		jwerty.key('e', function () { ControlManager.setControlState('o2_control', ControlUI.STATE_WARNING ); });

		jwerty.key('a', function () { ControlManager.setControlState('fan_control', ControlUI.STATE_ACTIVE ); });
		jwerty.key('s', function () { ControlManager.setControlState('fan_control', ControlUI.STATE_OFF ); });
		jwerty.key('d', function () { ControlManager.setControlState('fan_control', ControlUI.STATE_WARNING ); });

		jwerty.key('b', function () { ControlManager.setControlState('food_control', ControlUI.STATE_ACTIVE ); });
		jwerty.key('n', function () { ControlManager.setControlState('food_control', ControlUI.STATE_OFF ); });
		jwerty.key('m', function () { ControlManager.setControlState('food_control', ControlUI.STATE_WARNING ); });

		jwerty.key('h', function () { ControlManager.setControlState('comm_control', ControlUI.STATE_ACTIVE ); });
		jwerty.key('j', function () { ControlManager.setControlState('comm_control', ControlUI.STATE_OFF ); });
		jwerty.key('k', function () { ControlManager.setControlState('comm_control', ControlUI.STATE_WARNING ); });

		jwerty.key('u', function () { ControlManager.setControlState('heat_control', ControlUI.STATE_ACTIVE ); });
		jwerty.key('i', function () { ControlManager.setControlState('heat_control', ControlUI.STATE_OFF ); });
		jwerty.key('o', function () { ControlManager.setControlState('heat_control', ControlUI.STATE_WARNING ); });

		jwerty.key('8', function () { ControlManager.setControlState('light_control', ControlUI.STATE_ACTIVE ); });
		jwerty.key('9', function () { ControlManager.setControlState('light_control', ControlUI.STATE_OFF ); });
		jwerty.key('0', function () { ControlManager.setControlState('light_control', ControlUI.STATE_WARNING ); });

	}

	//instance method
	Keyboard.prototype.methodName = function( ) {

	}

	return Keyboard;

});