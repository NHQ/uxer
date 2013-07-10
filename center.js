var getCSS = require('./getCSS');

module.exports = function(el){
    
    el.style['-webkit-box-sizing'] = 'border-box'

    var w = getCSS(el, 'width').primitive.val
    ,   h = getCSS(el, 'height').primitive.val
    ;
    
    var pw = getCSS(el.parentElement, 'width').primitive.val
    ,   ph = getCSS(el.parentElement, 'height').primitive.val
    ;

    var dw = pw - w
    ,   dh = ph - h
    ;
    
    el.style.position = 'absolute';
    el.style['top'] = dh/2 + 'px';
    el.style['left'] = dw/2 + 'px';

}
