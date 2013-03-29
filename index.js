var shims = require('./shims.js')
,   bpm = require('./bpm.js')
,   Switch = require('./switch.js')
,   getCSS = require('./getCSS.js')
,   findPos = require('./findPosition.js')
,   syncopate = require('./intervals.js')
,   generateMatrix = require('./twist.js')
,   Buffer = require('buffer').Buffer
,   spin = require('./spin.js')
;


shims.disableWindowBounce();

var tap = document.createElement('div');

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

spin(tap);
bpm(tap);
syncopate(tap);
Switch(tap, false); // beginning val

var evt = new CustomEvent('startSync', {cancelable: false, bubbles: false});
tap.dispatchEvent(evt);
var evt = new CustomEvent('startBPM', {cancelable: false, bubbles: false});
tap.dispatchEvent(evt);


window.addEventListener('sync', function(e){
  h1.textContent = e.detail.intervals.join(',')
})

window.addEventListener('bpm', function(e){
  console.log('bpm', e.detail.bpm);
})

window.addEventListener('on', function(e){
//  console.log('on');
})

window.addEventListener('off', function(e){
//  console.log('off');
})

function pluck (t, freq, duration, steps) {
    var n = duration;
    var scalar = Math.max(0, 0.95 - (t * n) / ((t * n) + 1));
    var sum = 0;
    for (var i = 0; i < steps; i++) {
        sum += Math.sin(tau * t * (freq + i * freq));
    }
    return scalar * sum / 6;
}

function toArrayBuffer(buffer) {
    var ab = new ArrayBuffer(buffer.length);
    var view = new Float32Array(ab);
    for (var i = 0; i < buffer.length; ++i) {
        view[i] = buffer[i];
    }
    return ab;
}
