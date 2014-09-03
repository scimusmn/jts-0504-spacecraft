define(['net/Language'], function(Language){
	
	function Keyboard( ){
	
	}
	
	//constant method
	Keyboard.init = function(){
	
		jwerty.key('1', function () { 
		
			Language.setLanguage( Language.ENGLISH );
			 
		});
		
		jwerty.key('2', function () { 
		
			Language.setLanguage( Language.SPANISH );
			 
		});
		
	}
	
	//instance method
	Keyboard.prototype.methodName = function( ) {
				
	}

	return Keyboard;

});