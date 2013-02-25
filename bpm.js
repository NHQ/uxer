var touchy = require('./touchy.js')
,   touch = require('./touch.js')
;

module.exports = function(el){

  var start = 0
  ,   s = 0 
  ,   evt = {}
  ,   wto = undefined
  ,   interval = 0
  ,   bpm = 0
  ;

  if(Modernizr.touch) {

    touch.start(el);

    el.addEventListener('touchStart', bpmTest) 

  } else {

    el.addEventListener('mousedown', bpmTest);

  }

  function sincewhen(e){
    
  }

  function bpmTest(e){
    s = new Date().getTime();
    if(start == 0) {
      start = s;
      window.clearTimeout(wto);
      return
    }
    else {
      interval = s - start
      bpm = Number(60 / (interval / 1000)).toFixed(2);
      start = s;
      evt = new CustomEvent('bpm', { cancelable: true, bubbles: true, detail : { interval: interval, bpm: bpm }});
      this.dispatchEvent(evt);
      wto = window.setTimeout(function(){
        start = 0;
      }, 10000);
    }
  };

  return el

}
