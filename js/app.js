require.config({

    //By default load any module IDs from js/ directory
    baseUrl: 'js',

    //setup up shortcuts for commonly used libraries and components
    paths: {
	      'jquery'      	: 'vendor/jquery/jquery.min',
	      'tween'      		: 'vendor/gsap/src/minified/TweenMax.min',
          'animatesprite'   : 'vendor/animatesprite/scripts/jquery.animateSprite'
    },

});


require(['jquery', 'net/AppData', 'net/Keyboard', 'net/Language', 'net/ControlManager', 'tween' ], function( $, AppData, Keyboard, Language, ControlManager, tween ) {

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

        ControlManager.setupControls();

        startSpaceStationOrbit();

        //Temp
        //Mute all styles
        $("div").each(function(){
            $(this).css("border-color", "rgba(33,33,33,1)");
            $(this).css("background-color", "rgba(33,33,33,0.0)");
        });
        $("h1,h2,h3,p").each(function(){
            $(this).css("color", "rgba(155,155,155,1)");
        });
        $("p").each(function(){
            $(this).css("color", "rgba(155,155,155,0.5)");
        });

    }

    function startSpaceStationOrbit() {

        TweenMax.to( $("#space_station_container"), AppData.orbit_duration, { css: { rotation:360 }, ease:Linear.easeNone, repeat:-1, onUpdate: onStationRotateUpdate } );

    }

    function onStationRotateUpdate() {

        var rotation = $("#space_station_container")[0]._gsTransform.rotation;

        if ( rotation < AppData.SHADOW_EXIT_ANGLE && rotation > AppData.SHADOW_ENTER_ANGLE ) {

            //In Earth's shadow
            if (AppData.getSolarAvailable() == true) {

                ControlManager.setSolarAvailable(false);
                $("#available").attr('id', 'unavailable');
                Language.refreshTranslation($("#unavailable"));
                $("#unavailable").removeClass('go-green').addClass('warning-red');

            }

        } else {

            //In Sun's light
            if (AppData.getSolarAvailable() == false) {

                ControlManager.setSolarAvailable(true);
                $("#unavailable").attr('id', 'available');
                Language.refreshTranslation($("#available"));
                $("#available").removeClass('warning-red').addClass('go-green');

            }

        }

    }


});