define(['net/Language', 'net/ControlManager', 'net/ControlUI'], function(Language, ControlManager, ControlUI){
	
	function Keyboard( ){
	
	}
	
	//constant method
	Keyboard.init = function(){
	
		jwerty.key('1', function () { Language.setLanguage( Language.ENGLISH ); });
		jwerty.key('2', function () { Language.setLanguage( Language.SPANISH ); });

		jwerty.key('q', function () { ControlManager.setControlState('o2_control', ControlUI.STATE_ACTIVE ); });
		jwerty.key('w', function () { ControlManager.setControlState('o2_control', ControlUI.STATE_WARNING ); });
		jwerty.key('e', function () { ControlManager.setControlState('o2_control', ControlUI.STATE_OFF ); });

		jwerty.key('a', function () { ControlManager.setControlState('fan_control', ControlUI.STATE_ACTIVE ); });
		jwerty.key('s', function () { ControlManager.setControlState('fan_control', ControlUI.STATE_WARNING ); });
		jwerty.key('d', function () { ControlManager.setControlState('fan_control', ControlUI.STATE_OFF ); });

		jwerty.key('b', function () { ControlManager.setControlState('food_control', ControlUI.STATE_ACTIVE ); });
		jwerty.key('n', function () { ControlManager.setControlState('food_control', ControlUI.STATE_WARNING ); });
		jwerty.key('m', function () { ControlManager.setControlState('food_control', ControlUI.STATE_OFF ); });

		jwerty.key('h', function () { ControlManager.setControlState('comm_control', ControlUI.STATE_ACTIVE ); });
		jwerty.key('j', function () { ControlManager.setControlState('comm_control', ControlUI.STATE_WARNING ); });
		jwerty.key('k', function () { ControlManager.setControlState('comm_control', ControlUI.STATE_OFF ); });

		jwerty.key('u', function () { ControlManager.setControlState('heat_control', ControlUI.STATE_ACTIVE ); });
		jwerty.key('i', function () { ControlManager.setControlState('heat_control', ControlUI.STATE_WARNING ); });
		jwerty.key('o', function () { ControlManager.setControlState('heat_control', ControlUI.STATE_OFF ); });

		jwerty.key('8', function () { ControlManager.setControlState('light_control', ControlUI.STATE_ACTIVE ); });
		jwerty.key('9', function () { ControlManager.setControlState('light_control', ControlUI.STATE_WARNING ); });
		jwerty.key('[', function () { ControlManager.setControlState('light_control', ControlUI.STATE_OFF ); });
		
	}
	
	//instance method
	Keyboard.prototype.methodName = function( ) {
				
	}

	return Keyboard;

});