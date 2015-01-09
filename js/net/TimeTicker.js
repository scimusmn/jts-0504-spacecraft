/* ========================================================================================
   TimeTicker
   ===================================================================================== */

define(['tween'], function( tween ){

  function TimeTicker( containerDiv, updateSpeed ){

    this.containerDiv = containerDiv;

    this.h=1;
    this.m=0;
    this.timeStr = "00:00";
    this.updateSpeed = updateSpeed || 1000;
    this.updateSpeed *= 60;

    var thisRef = this;
    setInterval(function(){
        thisRef.update();
    }, this.updateSpeed);

  }


  TimeTicker.prototype.update = function(){

    this.m++;

    if (this.m>59) {
        this.h++;
        this.m=0;
    }
    if (this.h>12){
        this.h=1;
    }

    this.timeStr = padSpace(this.h)+':'+pad(this.m);
    $(this.containerDiv).html(this.timeStr);

  }

    function pad(num) {
        return (num < 10 ? '0' : '') + num;
    }

    function padSpace(num) {
        return (num < 10 ? '&nbsp;' : '') + num;
    }


  return TimeTicker;

});