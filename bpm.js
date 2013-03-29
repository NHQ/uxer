var touch = require('touchdown')
;

module.exports = function(el){

  var start = 0
  ,   s = 0 
  ,   evt = {}
  ,   wto = undefined
  ,   interval = 0
  ,   bpm = 0
  ;


  touch.start(el);

  el.addEventListener('startBPM', function(e){

      start = 0;

      intervals = 0;

      meta = {}

	  touch.resume(this);

	  el.removeEventListener('touchdown', bpmTest) 

	  el.addEventListener('touchdown', bpmTest) 
    
  });

  function bpmTest(e){
    s = new Date().getTime();
    interval = s - start
    bpm = start ? Number(60 / (interval / 1000)).toFixed(2) : 0
    start = s;
    evt = new CustomEvent('bpm', { cancelable: true, bubbles: true, detail : { interval: interval, bpm: bpm }});
    this.dispatchEvent(evt);
  };

  return el

}
