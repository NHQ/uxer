var shims = require('./shims.js')
,   bpm = require('./bpm.js')
,   Switch = require('./switch.js')
,   getCSS = require('./getCSS.js')
,   findPos = require('./findPosition.js')
,   touch = require('./touch.js')
,   syncopate = require('./intervals.js')
,   generateMatrix = require('./twist.js')
;

audio = new webkitAudioContext();
var source = audio.createBufferSource();
source.connect(audio.destination);
var xhr = new XMLHttpRequest();
xhr.open('GET', 'trololo.wav', true);
xhr.responseType = 'arraybuffer';
xhr.onload = function(){ 
  var buffer = audio.createBuffer(this.response, this.response.length);
/*  audio.decodeAudioData(xhr.response, function(buffer){
    console.log(buffer)
    source.buffer = buffer;
    source.noteOn(0);
  }, function(e){console.log(e)})
*/

    source.buffer = buffer;
    source.noteOn(0);

}
xhr.send();

shims.disableWindowBounce();

touch.handleMouse(true); 

var tap = document.createElement('div');

bpm(tap);
syncopate(tap);
Switch(tap, false); // beginning val

h1 = document.createElement('h1');
h1.id = "h1";

tap.appendChild(h1);

tap.style.width = '200px';
tap.style.height = '200px';
tap.style.position = 'fixed';
tap.style['border-radius'] = "50%";
tap.style.left = tap.style.top = '200px';
tap.style.border = '5px solid green';
tap.id = 'tap';
document.body.appendChild(tap);


var evt = new CustomEvent('syncStart', {cancelable: false, bubbles: false});
tap.dispatchEvent(evt);


window.addEventListener('sync', function(e){
  h1.textContent = e.detail.intervals.join(',')
})

window.addEventListener('bpm', function(e){
//  h1.textContent = e.detail.bpm;
})

window.addEventListener('switch', function(e){
//  console.log(e.detail.switch);
})

