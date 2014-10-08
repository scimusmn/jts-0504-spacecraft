/* ========================================================================================
   ControlUI
   ===================================================================================== */

define(['animatesprite'], function( animateSprite ){

  //STATES
  ControlUI.STATE_OFF = 'off';
  ControlUI.STATE_ACTIVE = 'active';
  ControlUI.STATE_WARNING = 'unavailable';
  ControlUI.STATE_WARNING = 'warning';

  function ControlUI( containerDiv, numFrames, loopActiveAnimation ){

    this.containerDiv = containerDiv;
    this.numFrames = numFrames;
    this.id = $(this.containerDiv).attr('id');
    this.setState(ControlUI.STATE_OFF);

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

    $(this.containerDiv).find('.state_off').parent().find('div .icon').removeClass('red').removeClass('active').addClass('off');

    switch (this.currentState) {

      case ControlUI.STATE_OFF:

        $( this.controlAnimation ).animateSprite('frame', 0);
        $( this.controlAnimation ).animateSprite( 'play', ControlUI.STATE_OFF );

        $(this.containerDiv).find('.state_off .icon').first().removeClass('off').addClass('active');

      break;
      case ControlUI.STATE_ACTIVE:

        $( this.controlAnimation ).animateSprite('frame', 1);
        $( this.controlAnimation ).animateSprite( 'play', ControlUI.STATE_ACTIVE );

        $(this.containerDiv).find('.state_solar .icon').first().removeClass('off').addClass('active');

      break;
      case ControlUI.STATE_WARNING:

        $( this.controlAnimation ).animateSprite('frame', 1);
        $( this.controlAnimation ).animateSprite( 'play', 'unavailable' );
        $(this.containerDiv).find('.state_battery .icon').first().removeClass('off').addClass('active');


      break;

    }

  };

  return ControlUI;

});