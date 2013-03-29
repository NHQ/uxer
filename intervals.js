var touch = require('touchdown')
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

  el.addEventListener('startSync', function(e){

      start = new Date().getTime();

      intervals.splice(0, intervals.length);

      meta = {}

	  touch.resume(this);
	
	  this.removeEventListener('touchdown', touchStart);

	  this.removeEventListener('liftoff', touchEnd);

	  this.addEventListener('touchdown', touchStart);

	  this.addEventListener('liftoff', touchEnd);
    
  })

  el.addEventListener('syncStop', function(e){

	  touch.pause(this);

	  this.removeEventListener('touchdown', touchStart);

	  this.removeEventListener('liftoff', touchEnd);
    
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
