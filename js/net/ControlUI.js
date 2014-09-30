/* ========================================================================================
   ControlUI 
   ===================================================================================== */

define(['animatesprite'], function( animateSprite ){

  //STATES
  ControlUI.STATE_OFF = 'off';
  ControlUI.STATE_ACTIVE = 'active';
  ControlUI.STATE_WARNING = 'warning';

  function ControlUI( containerDiv ){

    this.containerDiv = containerDiv; 
    this.id = $(this.containerDiv).attr('id'); 
    this.currentState = "";

    //setup animation 
    this.controlAnimation = $(this.containerDiv).find(".animation").first();

    $( this.controlAnimation ).animateSprite({
        fps: 12,
        animations: {
            off: [0], // first frame is always off state
            active: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
        },
        loop: true
    });

    //TEMP
    this.controlAnimation.hide();

    // $(this.controlAnimation).css('width', '150px');
    // $(this.controlAnimation).css('height', '150px');
    // $(this.controlAnimation).css('margin-left', '20px');
    // $(this.controlAnimation).css('margin-top', '20px');

  }

  // setState() | Update the control's display state.
  ControlUI.prototype.setState = function( stateId ) {

    this.currentState = stateId;

    $(this.containerDiv).find('.state_off').parent().find('div').removeClass('active');

    switch (this.currentState) {

      case ControlUI.STATE_OFF:
        
        $( this.controlAnimation ).animateSprite('frame', 0);
        $( this.controlAnimation ).animateSprite( 'play', ControlUI.STATE_OFF );
         
          $(this.containerDiv).find('.state_off').first().addClass('active');

      break;
      case ControlUI.STATE_ACTIVE:

        $( this.controlAnimation ).animateSprite('frame', 1);
        $( this.controlAnimation ).animateSprite( 'play', ControlUI.STATE_ACTIVE );
       
        $(this.containerDiv).find('.state_solar').first().addClass('active');

      break;
      case ControlUI.STATE_WARNING:

        $( this.controlAnimation ).animateSprite( 'play', ControlUI.STATE_ACTIVE );
        $(this.containerDiv).find('.state_battery').first().addClass('active');
        

      break;

    }

  };

  return ControlUI;

});