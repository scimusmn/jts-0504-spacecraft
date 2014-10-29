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


require(['jquery', 'net/AppData', 'net/Keyboard', 'net/Language', 'net/ControlManager', 'tween', 'net/Hardware' ], function( $, AppData, Keyboard, Language, ControlManager, tween, hardware ) {

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
        
        function cbConstructor(id){
        return function(){
        	ControlManager.setControlState(id,((!this.state)?'off':(this.state==1)?'active':'warning'));
        }
        }

    function initialize() {

		Keyboard.init();
		Language.setupTranslations( $(AppData.configXML).find("component").first() );

        ControlManager.setupControls();

        startSpaceStationOrbit();
        hardware.link(function(){
                      	hardware.oxygen.onchange = cbConstructor("o2_control");
                      	hardware.fan.onchange = cbConstructor("fan_control");
                      	hardware.food.onchange = cbConstructor("food_control");
                      	hardware.comm.onchange = cbConstructor("comm_control");
                      	hardware.heat.onchange = cbConstructor("heat_control");
                      	hardware.lights.onchange = cbConstructor("light_control");
                      });
    }

    function startSpaceStationOrbit() {

        TweenMax.to( $("#space_station_container"), AppData.ORBIT_CYCLE_TIME, { css: { rotation:360 }, ease:Linear.easeNone, repeat:-1, onUpdate: onStationRotateUpdate } );
        // TweenMax.to( $("#space_station"), AppData.ORBIT_CYCLE_TIME * 2, { css: { rotation:-360 }, ease:Linear.easeNone, repeat:-1 } );

    }

    function onStationRotateUpdate() {

        var rotation = $("#space_station_container")[0]._gsTransform.rotation;
        
        //ControlManager.batteryPack.updatePackLevel( hardware.battery );

        if ( rotation < 265 && rotation > 170 ) {

            //In Earth's shadow
            if (AppData.getSolarAvailable() == true) {

                AppData.setSolarAvailable(false);

                //TODO - Need current translation
                $("#available").html("NOT AVAILABLE");
                $("#available").css("color", "red");
        
        		hardware.sunState(0);

                ControlManager.o2Level.updateBatteryLevel( Math.random()*100, true );
                ControlManager.fanLevel.updateBatteryLevel( Math.random()*100, true );
                ControlManager.batteryPack.updatePackLevel( hardware.battery );

            }

        } else {
            //In Sun's light
            if (AppData.getSolarAvailable() == false) {

                AppData.setSolarAvailable(true);
                $("#available").html("AVAILABLE");
                $("#available").css("color", "green");
        
        		hardware.sunState(1);

                ControlManager.o2Level.updateBatteryLevel( Math.random()*100, true );
                ControlManager.fanLevel.updateBatteryLevel( Math.random()*100, true );
                ControlManager.batteryPack.updatePackLevel( hardware.battery);

            }


        }

    }


});