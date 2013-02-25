if(!window.CustomEvent){

  window.CustomEvent = function(name, data){
  
    var evt = document.createEvent('Event');

    evt.initEvent(name, data.bubbles, data.cancelable)

    evt.detail = data.detail ? data.detail : {};

    return evt

  }

}

exports.disableWindowBounce = function(){

  document.addEventListener('touchmove', function(e){e.preventDefault()})

}
