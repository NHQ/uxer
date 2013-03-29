var getCSS = require('./getCSS');

module.exports = function(el){
	
	var w = getCSS(el, 'width').value.val
	,   h = getCSS(el, 'height').value.val
  ;
 
  var pw = getCSS(el.parentElement, 'width').value.val
  ,   ph = getCSS(el.parentElement, 'height').value.val
  ;

  var dw = pw - w, dh = ph - h;

	el.style.position = 'absolute';
  el.style['top'] = dh/2 + 'px';
  el.style['left'] = dw/2 + 'px';

  console.log(dw, dh, pw, ph, w, h)
}