require.config({

    //By default load any module IDs from js/ directory
    baseUrl: 'js',
    
    //setup up shortcuts for commonly used libraries and components
    paths: {
	      'jquery'      	: 'vendor/jquery/dist/jquery.min',
	      'tween'      		: 'vendor/gsap/src/minified/TweenMax.min'
    }
    
});


require(['jquery', 'net/AppData', 'net/Keyboard', 'net/Language' ], function( $, AppData, Keyboard, Language ) {

	/*--------------*/
	/* Initial Load */
	/*--------------*/
	    
	//Load XML
    $.ajax({
        type: "GET",
        url: "data/config.xml",
        dataType: "xml",
        success: function (xml) {
        
        	AppData.updateSettings(xml);
        	initialize();
			
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // Show error message if desired
            
        }
    });
    
    function initialize() {
    	
		Keyboard.init();
		Language.setupTranslations( $(AppData.configXML).find("component").first() );
		
    }

});