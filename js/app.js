require.config({

    //By default load any module IDs from js/ directory
    baseUrl: 'js',

    //setup up shortcuts for commonly used libraries and components
    paths: {
	      'jquery'      	: 'vendor/jquery/jquery.min',
	      'tween'      		: 'vendor/gsap/src/minified/TweenMax.min',
          'animatesprite'   : 'vendor/animatesprite/scripts/jquery.animateSprite',
          'howler'          : 'vendor/howler/howler.min'
    },

});


require(['jquery', 'net/AppData', 'net/Keyboard', 'net/Language', 'net/ControlManager', 'net/Sound', 'net/TimeTicker', 'tween' ], function( $, AppData, Keyboard, Language, ControlManager, Sound, TimeTicker, tween ) {

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

        Sound.preloadSounds('sounds/', ['alarms', 'rustling', 'cooking', 'fan', 'lights', 'telecom', 'male-breathing', 'female-breathing', 'bubbles']);

        startSpaceStationOrbit();

        //Temp
        //Mute all styles
        // $("div").each(function(){
        //     $(this).css("border-color", "rgba(33,33,33,1)");
        //     $(this).css("background-color", "rgba(33,33,33,0.0)");
        // });
        // $("h1,h2,h3,p").each(function(){
        //     $(this).css("color", "rgba(155,155,155,1)");
        // });
        // $("p").each(function(){
        //     $(this).css("color", "rgba(155,155,155,0.5)");
        // });

    }

    function startSpaceStationOrbit() {

        //Orbit Earth
        TweenMax.to( $(".space_station_container"), AppData.orbitDuration, { css: { rotation:360 }, ease:Linear.easeNone, repeat:-1, onUpdate: onStationRotateUpdate } );

        //Time readout
        //the Space Station orbits Earth (and sees a sunrise) once every 92 minutes
        var minuteRatio = AppData.orbitDuration / (92*60);
        var updateSpeed = Math.floor(1000 * minuteRatio);
        var t = new TimeTicker($("#time_clock"), updateSpeed);

        //Pulse beacon light
        TweenMax.set( $("#container_beacon"), { css: { opacity:0.6 }} );
        TweenMax.to( $("#container_beacon"), 0.5, { css: { opacity:1 }, repeat:-1, yoyo:true } );

    }

    function onStationRotateUpdate() {

        var rotation = $(".space_station_container")[0]._gsTransform.rotation;

        if ( rotation < AppData.SHADOW_EXIT_ANGLE && rotation > AppData.SHADOW_ENTER_ANGLE ) {

            //In Earth's shadow
            if (AppData.getSolarAvailable() == true) {

                ControlManager.setSolarAvailable(false);
                $("#available").attr('id', 'unavailable');
                Language.refreshTranslation($("#unavailable"));
                $("#unavailable").removeClass('go-green').addClass('warning-red');
                TweenMax.set( $("#unavailable"), { css: { scale:1, transformOrigin: "50% 50%" } } );
                TweenMax.to( $("#unavailable"), 0.25, { css: { scale:1.25, transformOrigin: "50% 50%" }, ease:Power2.easeOut, repeat:1, yoyo:true } );

            }

        } else {

            //In Sun's light
            if (AppData.getSolarAvailable() == false) {

                ControlManager.setSolarAvailable(true);
                $("#unavailable").attr('id', 'available');
                Language.refreshTranslation($("#available"));
                $("#available").removeClass('warning-red').addClass('go-green');
                TweenMax.set( $("#available"), { css: { scale:1, transformOrigin: "50% 50%" } } );
                TweenMax.to( $("#available"), 0.25, { css: { scale:1.25, transformOrigin: "50% 50%" }, ease:Power2.easeOut, repeat:1, yoyo:true } );

            }

        }

    }


});