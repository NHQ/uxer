var touch = require('touchdown')


module.exports = function(el, cb){

  var start = undefined 
  ,   s = 0 
  ,   last = 0
  ,   evt = {}
  ,   wto = undefined
  ,   interval = 0
  ,   bpm = 0
  ;


  touch.start(el);


    var meta = {}

	  touch.resume(this);

	  el.addEventListener('touchdown', bpmTest) 
    
  var timeout = null

  function bpmTest(e){
    s = new Date().getTime();
    if(!start) {
      start = s
    }
    clearTimeout(timeout)    
    timeout = setTimeout(function(){
      start = undefined
    }, 3000)
    interval = s - start
    bpm = start ? Number(60 / (interval / 1000)).toFixed(2) : 0
    start = s;
    if(cb) cb(bpm, interval)
    else{
      evt = new CustomEvent('bpm', { cancelable: true, bubbles: true, detail : { interval: interval, bpm: bpm }});
      this.dispatchEvent(evt);
    }
  };

  return el

}
