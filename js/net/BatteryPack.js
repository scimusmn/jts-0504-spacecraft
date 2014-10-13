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

    this.powerLevel = Math.round(level);

    console.log(this.powerLevel);

    if (this.powerLevel > 100) this.powerLevel = 100;

    if (this.powerLevel <= 0) {

      this.powerLevel = 0;

      this.batteries[0].showFailState();
      this.batteries[1].showFailState();

    } else {

      var level1 = 100;
      var level2 = 100;

      if (this.powerLevel >= 50) {

        //battery-left not empty
        this.batteries[0].clearFailState();
        level1 = (this.powerLevel-50)/50 * 100;

        //battery-right full
        level2 = 100;

      } else {

        //battery-left empty
        level1 = 0;
        this.batteries[0].showFailState();

        //battery-right not empty
        this.batteries[1].clearFailState();
        level2 = (this.powerLevel/50) * 100;

      }

      this.batteries[0].updateBatteryLevel( level1, false );
      this.batteries[1].updateBatteryLevel( level2, false );

    }

    $(this.textDisplay).html(this.powerLevel+"%");

  };

  return BatteryPack;

});