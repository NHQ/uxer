var touch = require('./touch.js');

module.exports = function(el, gate){

  gate = gate || false

  var name = gate ? 'on' : 'off'

  if(Modernizr.touch) {

    touch.start(el);

    el.addEventListener('touchStart', Switch) 

  } else {

    el.addEventListener('mousedown', Switch);

  }

  function Switch(e){

    gate = !gate

    name = gate ? 'on' : 'off' 

    evt = new CustomEvent(name, {bubbles: true, cancelable: true, detail : {switch: gate }});

    this.dispatchEvent(evt);

  };

  return el

}
