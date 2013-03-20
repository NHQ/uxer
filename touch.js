var touchy = require('./touchy.js')
,   findPos = require('./findPosition.js')
,   uuid = require('node-uuid')
;

module.exports = (function(){

  if(window._touch) return window._touch;

  else return new touch()

}());

function touch(){

  window._touch = this;

  this.elements = [];

  this.touchy = touchy(window, touchtest);

};

touch.prototype.start = touch.prototype.listen = function(el){

    if(!el.touch_id) el.touch_id = ('function' == typeof uuid.v1) ? uuid.v1() : uuid();

    this.elements.push(el);

    el.touch = 1;

};

touch.prototype.register = function(el){

    if(!el.touch_id) el.touch_id = uuid.v1();

    this.elements.push(el);

    el.touch = 0; // needs to be started

};


function touchtest(hand, finger){

  finger.on('start', function(point){

    var el = search(document.elementFromPoint(point.x, point.y));

    if(el){

      this.is = true;

      this.el = el;

      this.event.id = this.id;

      var evt = new CustomEvent('touchStart', { cancelable: true, bubbles: true, detail : this.event});
      
      el.dispatchEvent(evt);

    }

  });
 
  finger.on('move', function(point){

    if(this.is){

      var evt = new CustomEvent('touchMove', { cancelable: true, bubbles: true, detail : this.event});
      
      this.el.dispatchEvent(evt);

    }

  });

  finger.on('end', function(point){
 
    if(this.is){

      var evt = new CustomEvent('touchEnd', { cancelable: true, bubbles: true, detail : this.event});

      this.el.dispatchEvent(evt);

    }

  });

};

function search(el){

  return scan(el)

  function scan(el){

    if(!el) return false;
  
    var x = window._touch.elements.reduce(function(val, i){

      if(i.id == el.id && i.touch){

        val = i

      };

      return val

    }, false)

    return x || scan(el.parentElement)

  }

};


touch.prototype.pause = function(el){

  el.touch = 0

};

touch.prototype.resume = function(el){

  el.touch = 1

};

touch.prototype.end = function(el){

  delete el.touch

  delete el.touch_id

};

touch.prototype.handleMouse = function(x){

  if(Modernizr) Modernizr.touch = true;

  this.touchy.handleMouse(x);

};
