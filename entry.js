var spin = require('./spinx')

var circle = document.createElement('div')

circle.style.width = circle.style.height = '200px'
circle.style.border = '13px solid black'
circle.style.borderTopColor = 'yellow'
circle.style.borderRadius = '50% 50%'

document.body.appendChild(circle)

var amplitude = 0

spin(circle, function(_delta, total){
  //console.log(total * 180 / Math.PI)
  !(function(el, _delta){
    amplitude = amplitude + -_delta 
    console.log(_delta, amplitude / Math.PI / 2)
    window.requestAnimationFrame(function(){
      el.style.transform = 'rotateZ('+ (amplitude * 180 / Math.PI ) + 'deg)'
  })})(circle, _delta, total)
})
