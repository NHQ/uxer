var touch = require('touchdown');

module.exports = function(el, gate){

  gate = gate || false

  touch.start(el);

  el.addEventListener('touchdown', Switch);

  function Switch(e){

    gate = !gate

    var evt = new CustomEvent('switch', {bubbles: true, cancelable: true, detail : gate });

    this.dispatchEvent(evt);

  };

  return el

}
