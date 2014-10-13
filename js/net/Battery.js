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

    this.failState = $(this.containerDiv).find("#fail");
    $(this.failState).hide();
    console.log( $(this.failState).attr('id') );

    this.powerLevel = 100;

  }

  // updateBatteryLevel() | Update remaining power level of the battery. Battery levels are between 0 - 100
  Battery.prototype.updateBatteryLevel = function( level, snapToBars ) {

    this.powerLevel = Math.round(level);

    if (this.powerLevel > 100) this.powerLevel = 100;

    if (this.powerLevel <= 0) {
      this.powerLevel = 0;

      //TODO - show broken battery state


    } else {

      var visLevel = this.powerLevel;

      if (snapToBars == true) visLevel = snapToFourth(visLevel);

      var levelScale = 1 - (visLevel / 100);

      TweenLite.to( $(this.mask), 0.5, { css: { scaleY:levelScale, transformOrigin: "50% 0%" } } );

    }

    $(this.textDisplay).html(this.powerLevel+"%");

  };

  Battery.prototype.clearFailState = function( ) {

    $(this.failState).parent().children().show();
    $(this.failState).hide();

  }

  Battery.prototype.showFailState = function( ) {

    $(this.failState).parent().children().hide();
    $(this.failState).show();

  }

  function snapToFourth( value ) {

    var snappedValue = 0;

    if ( value >= 75 ){

      snappedValue = 100;

    } else if (value > 50 ) {

      snappedValue = 75;

    } else if ( value > 25 ) {

      snappedValue = 50;

    } else if ( value > 0 ) {

      snappedValue = 25;

    }

    return snappedValue;

  }

  return Battery;

});