var touch = require('./touch.js')
;

module.exports = syncopate

function syncopate (el){

  var start = 0
  ,   s = 0 
  ,   meta = {}
  ,   wto = undefined
  ,   interval = 0
  ,   intervals = []
  ;

  touch.register(el);

  el.addEventListener('syncStart', function(e){

      start = new Date().getTime();

      intervals.splice(0, intervals.length);

      meta = {}

      if(Modernizr.touch) {

	  touch.resume(this);

	  this.addEventListener('touchStart', touchStart);

	  this.addEventListener('touchEnd', touchEnd);


      } else {

	  this.addEventListener('mousedown',touchStart);

	  this.addEventListener('mouseup', touchEnd);

      }
    
  })

  el.addEventListener('syncStop', function(e){

      if(Modernizr.touch) {

	  touch.pause(this);

	  this.removeEventListener('touchStart', touchStart);

	  this.removeEventListener('touchEnd', touchEnd);


      } else {

	  this.removeEventListener('mousedown', touchStart);

	  this.removeEventListener('mouseup', touchEnd);

      }
    
  })

  function touchStart(e){

    s = new Date().getTime() - start

    var index = intervals.push([s]) - 1;

    var evt = new CustomEvent('sync', { cancelable: true, bubbles: true, detail: {intervals: intervals}});

    this.dispatchEvent(evt);

    meta[e.detail.id] = index

  };

  function touchEnd(e){

    s = new Date().getTime() - start

    var index = meta[e.detail.id]

    intervals[index].push(s)   

    var evt = new CustomEvent('sync', { cancelable: true, bubbles: true, detail: {intervals: intervals}});

    this.dispatchEvent(evt);

  };

  return el

}
