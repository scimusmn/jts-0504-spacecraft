/* ========================================================================================
   BatteryPack
   ===================================================================================== */

define(['net/Battery', 'tween'], function( Battery, tween ){

  function BatteryPack( containerDivLeft, containerDivRight ){

    this.powerLevel = 100;
    this.textDisplay = $(containerDivLeft).parent().parent().find("#batteries_level_percent").last();

    this.batteries = [ new Battery(containerDivLeft), new Battery(containerDivRight) ];

  }

  // updatePackLevel() | Update remaining power level of whole pack. Levels between 0 - 100
  BatteryPack.prototype.updatePackLevel = function( level ) {

    //clamp battery level 0-100
    this.powerLevel = Math.round( Math.max(0, Math.min(level, 100) ) );

    this.batteries[0].updateBatteryLevel( this.powerLevel, false );
    this.batteries[1].updateBatteryLevel( this.powerLevel, false );

    $(this.textDisplay).html(this.powerLevel+"%");

  };

  // setFailStates() | Turn on/off fail states for each battery
  BatteryPack.prototype.setFailStates = function( battLeftFail, battRightFail ) {

    if (battLeftFail == false) {
      this.batteries[0].clearFailState();
    }else{
      this.batteries[0].showFailState();
    }

    if (battRightFail == false) {
      this.batteries[1].clearFailState();
    }else{
      this.batteries[1].showFailState();
    }

  };

  return BatteryPack;

});