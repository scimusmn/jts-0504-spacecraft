/* ========================================================================================
   ControlUI
   ===================================================================================== */

define(['animatesprite', 'net/AppData'], function( animateSprite, AppData ){

  //STATES
  ControlUI.STATE_OFF = 0;
  ControlUI.STATE_SOLAR = 1;
  ControlUI.STATE_BATTERY = 2;

  function ControlUI( containerDiv, numFrames, loopActiveAnimation ){

    this.containerDiv = containerDiv;
    this.numFrames = numFrames;
    this.id = $(this.containerDiv).attr('id');
    this.setState(ControlUI.STATE_OFF);
    this.isActive = false;

    //setup animation
    this.controlAnimation = $(this.containerDiv).find(".animation").first();

    //Create active frames array (assume every frame after first is for active animation)
    var activeFrames = [];
    for (var i = 1; i < numFrames-1; i++) {
      activeFrames.push(i+1);
    };

    $( this.controlAnimation ).animateSprite({
        fps: 12,
        animations: {
            off: [0], // first frame is always off state
            unavailable: [1], // second frame is always unavailable state
            active: activeFrames
        },
        loop: loopActiveAnimation
    });

  }

  // setState() | Update the control's display state.
  ControlUI.prototype.setState = function( stateId ) {

    this.currentState = stateId;
    this.refreshStateDisplay();

  }

  // refreshStateDisplay() | refresh animation and icons to match current state.
  ControlUI.prototype.refreshStateDisplay = function( ) {

    $(this.containerDiv).find('.state_off').parent().find('div .icon').removeClass('red').removeClass('active').addClass('off');
    this.isActive = false;

    switch (this.currentState) {

      case ControlUI.STATE_OFF:

        $( this.controlAnimation ).animateSprite('frame', 0);
        $( this.controlAnimation ).animateSprite('play', 'off' );
        $(this.containerDiv).find('.state_off .icon').first().removeClass('off').addClass('active');

      break;
      case ControlUI.STATE_SOLAR:

        if (AppData.solarAvailable == true) {

          $( this.controlAnimation ).animateSprite('frame', 1);
          $( this.controlAnimation ).animateSprite('play', 'active' );
          $(this.containerDiv).find('.state_solar .icon').first().removeClass('off red').addClass('active');
          this.isActive = true;

        } else {

          $( this.controlAnimation ).animateSprite('frame', 1);
          $( this.controlAnimation ).animateSprite('play', 'unavailable');
          $(this.containerDiv).find('.state_solar .icon').first().removeClass('off active').addClass('red');

        }
      break;
      case ControlUI.STATE_BATTERY:

        if (AppData.currentPowerLevel > 0) {

          $( this.controlAnimation ).animateSprite('frame', 1);
          $( this.controlAnimation ).animateSprite('play', 'active' );
          $(this.containerDiv).find('.state_battery .icon').first().removeClass('off red').addClass('active');
          this.isActive = true;

        } else {

          $( this.controlAnimation ).animateSprite('frame', 1);
          $( this.controlAnimation ).animateSprite('play', 'unavailable');
          $(this.containerDiv).find('.state_battery .icon').first().removeClass('off active').addClass('red');

        }

      break;

    }

  };

  return ControlUI;

});