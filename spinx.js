var touchdown = require('../touchdown')
var _switch = require('./switch')
var getCSS = require('./getCSS')
var trig = require('./trig')
var tau = Math.PI * 2
module.exports = function(el, cb){
  
  touchdown.start(el)

  var prev = []
  var w = parseFloat(getCSS(el,'width'))
  var h = parseFloat(getCSS(el, 'height'))
  var pos = [el.offsetLeft, el.offsetTop] //findPos(el)
  var center = [pos[0] + w / 2, pos[1] + h / 2]
  var total = 0 
  var la = 0, laa = 0, laaa = 0

  el.addEventListener('touchdown', touch)
  el.addEventListener('deltavector', delta)
  //el.addEventListener('liftoff', delta)

  function touch(evt){
    let p = [evt.detail.pageX - center[0], center[1] - evt.detail.pageY ] 
    let rd = trig.distance([0,0], p)
    var a = trig.angle([0,rd], p) 
    var da = (a - la)
    var aa = trig.angle([0, -rd], p) 
    var daa = (aa - laa)
    var aaa = Math.min((daa), (da))
    var daaa = aaa - laaa
    var dx = Math.abs(daa) <= Math.abs(da) ? daa : da
    //console.log(da, daa, daaa)
    la = a, laa = aa, laaa = aaa
  }

  function delta(evt){
    let p = [evt.detail.pageX - center[0], center[1] - evt.detail.pageY ] 
    let rd = trig.distance([0,0], p)
    var a = trig.angle([0,rd], p) 
    var da = (a - la)
    var aa = trig.angle([0, -rd], p) 
    var daa = (aa - laa)
    var aaa = Math.min((daa), (da))
    var daaa = aaa - laaa
    var dx = Math.abs(daa) <= Math.abs(da) ? daa : da
    la = a, laa = aa, laaa = aaa
    a = dx//trig.angle([0,0], p)
    total = total + a
    cb(a, total)
  }

}
