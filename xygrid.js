var touchdown = require('../touchdown')
var findPos = require('./findPosition')

module.exports = function(el, cb){

  cb = cb || function(){}

  var w = parseFloat(el.style.width)
  var h = parseFloat(el.style.height)
  var pos = findPos(el)
  var center = [pos[0] + w / 2, pos[1] + h / 2]
  var r = w  / h
  var last = []

  touchdown.start(el)
 
  el.addEventListener('touchdown', handler) 
  el.addEventListener('deltavector', handler) 
  el.addEventListener('liftoff', handlerOff) 

  function handlerOff(evt){
    cb(xy(evt), [evt.detail.offsetX, evt.detail.offsetY], true)
  }

  function handler(evt){
    cb(xy(evt), [evt.detail.offsetX, evt.detail.offsetY], false)
  }

  function xy(evt){
    if(!(evt.detail.target == el)) return last
    last = [evt.detail.offsetX / w, (h - evt.detail.offsetY) / h]
    return last 
  }


  return el

}
