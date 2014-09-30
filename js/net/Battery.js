/* ========================================================================================
   Battery 
   ===================================================================================== */

define(['tween'], function( tween ){

  //STATES
  Battery.STATE_DEAD = 'dead';
  Battery.STATE_FULL = 'full';
  Battery.STATE_DEPLETING = 'depleting';

  function Battery( containerDiv ){

    this.containerDiv = containerDiv; 
    this.mask = $(this.containerDiv).find("#mask");
    this.levelBar = $(this.containerDiv).find("#level_bar");
    this.textDisplay = $(this.containerDiv).find(".bottom").last();

    this.powerLevel = 100;

  }

  // updateBatteryLevel() | Update remaining power level of the battery. Battery levels are between 0 - 100
  Battery.prototype.updateBatteryLevel = function( level ) {


    this.powerLevel = Math.round(level);
    if (this.powerLevel > 100) this.powerLevel = 100;

    if (this.powerLevel <= 0) {
      this.powerLevel = 0;

      //TODO - show broken battery state


    } else {
      
      var levelScale = 1 - (this.powerLevel / 100);
      TweenLite.to( $(this.mask), 0.25, { css: { scaleY:levelScale, transformOrigin: "50% 0%" } } );

    }

    $(this.textDisplay).html(this.powerLevel+"%");

  };

  return Battery;

});