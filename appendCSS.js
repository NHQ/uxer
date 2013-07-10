module.exports = function(css, id){
    var es = document.getElementById(id);

    if(es){
	return false
//	es.parentNode.insertBefore(makeStyle(css), es.nextSibling)
    }
    else{
	var styleSheet = makeStyle(css, id)
	document.head.insertBefore(styleSheet, document.head.childNodes[0]);
	return styleSheet
    }

}


function makeStyle(str, id){
    var style = document.createElement('style');
    style.id = id || '';
    style.textContent = str;
    return style
}
