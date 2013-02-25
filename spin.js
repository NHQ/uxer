module.exports = function(el, opts){

  el.addEventListener('mousedown', Switch);

  function Switch(e){

    evt = new CustomEvent('spin', {bubbles: true, cancelable: true, detail : { }});

    this.dispatchEvent(evt);

  };

  return el

}
