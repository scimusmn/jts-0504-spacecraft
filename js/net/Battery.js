/* ========================================================================================
   Battery
   ===================================================================================== */

define(['tween'], function( tween ){

  //STATES
  Battery.STATE_DEAD = 'dead';
  Battery.STATE_FULL = 'full';
  Battery.STATE_DEPLETING = 'depleting';

  Battery.COLORS = ['#DF0E1F','#DF191E','#DC321A','#DF4A1D','#DC6D1A','#DE8018','#D29519','#AD961A','#A8951D','#98961D','#8F9320','#4F9126','#328B29','#288A2B'];

  function Battery( containerDiv ){

    this.containerDiv = containerDiv;
    this.mask = $(this.containerDiv).find("#mask");
    this.levelBar = $(this.containerDiv).find("#level_bar");
    this.textDisplay = $(this.containerDiv).find(".bottom").last();

    this.failState = $(this.containerDiv).find("#fail");
    $(this.failState).hide();

    this.fillTimer = {};
    this.warningState = false;
    this.powerLevel = 100;

  }

  // updateBatteryLevel() | Update remaining power level of the battery. Battery levels are between 0 - 100
  Battery.prototype.updateBatteryLevel = function( level, snapToBars ) {

    this.powerLevel = Math.round(level);

    if (this.powerLevel > 100) this.powerLevel = 100;
    if (this.powerLevel <= 0) this.powerLevel = 0;

    var visLevel = this.powerLevel;

    if (snapToBars == true) visLevel = snapToFourth(visLevel);

    var levelScale = 1 - (visLevel / 100);

    TweenLite.to( $(this.mask), 0.3, { css: { scaleY:levelScale, transformOrigin: "50% 0%" }, ease:Linear.easeNone } );

    this.refreshText();

  };

  Battery.prototype.refreshText = function( ) {

    $(this.textDisplay).html(this.powerLevel+"%");

    if (this.powerLevel < 25 && this.powerLevel > 0 && this.warningState == false){

      $(this.textDisplay).addClass('warning-red');
      TweenMax.set( $(this.textDisplay), { css: { scale:1, transformOrigin: "50% 50%" } } );
      TweenMax.to( $(this.textDisplay), 0.5, { css: { scale:1.5, transformOrigin: "50% 50%" }, repeat:-1, yoyo:true } );
      this.warningState = true;

    } else if (this.powerLevel >= 25 && this.warningState == true) {

      $(this.textDisplay).removeClass('warning-red');
      TweenMax.to( $(this.textDisplay), 0.25, { css: { scale:1, transformOrigin: "50% 50%" }} );
      this.warningState = false;

    } else if (this.powerLevel <= 0) {

      $(this.textDisplay).addClass('warning-red');
      TweenMax.killTweensOf( $(this.textDisplay) );
      TweenMax.to( $(this.textDisplay), 0.5, { css: { scale:1.5, transformOrigin: "50% 50%" } } );
      this.warningState = false;

    }

  }

  Battery.prototype.currentLevelColor = function( ) {
    var c = Math.floor((this.powerLevel/100) * Battery.COLORS.length);
    return Battery.COLORS[c];
  }

  Battery.prototype.timedFill = function( increment ) {

    clearInterval(this.fillTimer);

    var thisRef = this;
    thisRef.fillTimer = setInterval(function(){

      thisRef.updateBatteryLevel(thisRef.powerLevel + increment);

    }, 350);

  }

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