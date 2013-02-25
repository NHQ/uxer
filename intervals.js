var touch = require('./touch.js')
;

module.exports = syncopate

function syncopate (el){

  var start = 0
  ,   s = 0 
  ,   evt = {}
  ,   wto = undefined
  ,   interval = 0
  ,   intervals = []
  ;

  touch.register(el);

  el.addEventListener('syncStart', function(e){

      start = new Date().getTime();

      intervals.splice(0, intervals.length);

      if(Modernizr.touch) {

	  touch.resume(this);

	  this.addEventListener('touchStart', sync);

	  this.addEventListener('touchEnd', sync);


      } else {

	  this.addEventListener('mousedown', sync);

	  this.addEventListener('mouseup', sync);

      }
    
  })

  el.addEventListener('syncStop', function(e){

      if(Modernizr.touch) {

	  touch.pause(this);

	  this.removeEventListener('touchStart', sync);

	  this.removeEventListener('touchEnd', sync);


      } else {

	  this.removeEventListener('mousedown', sync);

	  this.removeEventListener('mouseup', sync);

      }
    
  })

  function sync(e){

    s = new Date().getTime() - start

    intervals.push(s);

    evt = new CustomEvent('sync', { cancelable: true, bubbles: true, detail: {intervals: intervals}});

    this.dispatchEvent(evt);

  };

  return el

}
