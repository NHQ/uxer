var touch = require('./touch.js');

module.exports = function(el, gate){

  gate = gate || false

  if(Modernizr.touch) {

    touch.start(el);

    el.addEventListener('touchStart', Switch) 

  } else {

    el.addEventListener('mousedown', Switch);

  }

  function Switch(e){

    gate = !gate

    evt = new CustomEvent('switch', {bubbles: true, cancelable: true, detail : {switch: gate }});

    this.dispatchEvent(evt);

  };

  return el

}
