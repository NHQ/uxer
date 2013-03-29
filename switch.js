var touch = require('touchdown');

module.exports = function(el, gate){

  gate = gate || false

  var name = gate ? 'on' : 'off'

  touch.start(el);

  el.addEventListener('touchdown', Switch);

  function Switch(e){

    gate = !gate

    name = gate ? 'on' : 'off' 

    evt = new CustomEvent(name, {bubbles: true, cancelable: true, detail : {switch: gate }});

    this.dispatchEvent(evt);

  };

  return el

}
