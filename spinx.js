var touchdown = require('../touchdown')
var _switch = require('./switch')
var findPos = require('./findPosition')
var getCSS = require('./getCSS')
var trig = require('./trig')
var tau = Math.PI * 2
module.exports = function(el, cb){
  
  touchdown.start(el)

  var prev = []
  var pangle = 0
  var w = parseFloat(el.style.width)
  var h = parseFloat(el.style.height)
  var pos = findPos(el)
  var center = [pos[0] + w / 2, pos[1] + h / 2]
  var total = 0 
  

  el.addEventListener('touchdown', touch)
  el.addEventListener('deltavector', delta)
  el.addEventListener('liftoff', delta)

  function touch(evt){
    var a = trig.angle([0,0], [evt.detail.pageX - center[0], center[1] - evt.detail.pageY])
    pangle = a
  }

  function delta(evt){
    var a = trig.angle([0,0], [evt.detail.pageX - center[0], center[1] - evt.detail.pageY - el.parentNode.scrollTop] )
    var dd = Math.abs(a - pangle) % tau
    var r = dd > Math.PI ? tau - dd : dd
    var sign = (a - pangle >= 0 && a - pangle <= Math.PI) || (a - pangle <= -Math.PI && a - pangle >= -Math.PI * 2) ? 1 : -1
    r *= sign
    //console.log(r, (a - pangle) % Math.PI * 2)
    var d = pangle - a
    total = total + r
    pangle = a
    cb(r, total)
  }

}
