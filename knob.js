var spin = require('./spinx')

module.exorts = function(param, cb){
  if(param === undefined) param = function(){}
  if(typeof param === 'function'){
    cb = param
    param = {}
  }
  var knob = createKnob()
  if(param.style){
    for(var style in param.style){
      knob.style[style] = param.style[style]
    }
  }

  knob.addEventListener('DOMNodeInserted', function(evt){
    var amplitude = 0
    setTimeout(function(){
    spin(circle, function(_delta, total){
      //console.log(total * 180 / Math.PI)
      cb(_delta, total)
      ;(function(el, _delta){
        amplitude = amplitude + -_delta 
        console.log(_delta, amplitude / Math.PI / 2)
        window.requestAnimationFrame(function(){
          el.style.transform = 'rotateZ('+ (amplitude * 180 / Math.PI ) + 'deg)'
      })})(circle, _delta, total)
    })
    },10)
    
  }, false)

  return knob

}

function createKnob(){
  var circle = document.createElement('div')
  circle.style.width = circle.style.height = '200px'
  circle.style.border = '13px solid black'
  circle.style.borderTopColor = 'yellow'
  circle.style.borderRadius = '50% 50%'
  return circle

}
document.body.appendChild(circle)


