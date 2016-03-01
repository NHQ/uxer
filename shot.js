var touch = require('touchdown');

module.exports = function(el, gate, cb){

  if(typeof gate === 'function'){
    cb = gate
    gate = false
  }

  gate = gate || false

  touch.start(el);

  el.addEventListener('touchdown', Switch);
  el.addEventListener('liftoff', Switch);

  function Switch(e){

    gate = !gate

    if(cb) cb(gate)

    else{
      var evt = new CustomEvent('switch', {bubbles: true, cancelable: true, detail : gate });

      this.dispatchEvent(evt);
    }
  };

  return el

}
