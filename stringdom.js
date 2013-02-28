var div = document.createElement('div');

module.exports = function(str){

  div.innerHTML = str;

  return div.childNodes

}
