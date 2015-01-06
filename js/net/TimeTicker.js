/* ========================================================================================
   TimeTicker
   ===================================================================================== */

define(['tween'], function( tween ){

  function TimeTicker( containerDiv, updateSpeed ){

    this.containerDiv = containerDiv;

    this.h=0;
    this.m=0;
    this.s=0;
    this.timeStr = "00:00:00";
    this.updateSpeed = updateSpeed || 1000;

    var thisRef = this;
    setInterval(function(){
        thisRef.update();
    }, this.updateSpeed);

  }


  TimeTicker.prototype.update = function(){

    this.s++;

    if (this.s>59) {
        this.m++;
        this.s=0;
    }
    if (this.m>59) {
        this.h++;
        this.m=0;
    }
    if (this.h>23){
        this.h=0;
    }

    //seconds is jibberish (too fast to make sense)
    // this.s = Math.floor(Math.random()*60);

    this.timeStr = pad(this.h)+':'+pad(this.m)+':'+pad(this.s);
    $(this.containerDiv).html(this.timeStr);

  }

    function pad(num) {
        return (num < 10 ? '0' : '') + num;
    }


  return TimeTicker;

});