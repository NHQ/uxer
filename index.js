var shims = require('./shims.js')
,   bpm = require('./bpm.js')
,   Switch = require('./switch.js')
,   getCSS = require('./getCSS.js')
,   findPos = require('./findPosition.js')
,   touch = require('./touch.js')
,   syncopate = require('./intervals.js')
,   generateMatrix = require('./twist.js')
,   writeWave = require('./writeWave.js')
,   Buffer = require('buffer').Buffer
,   webaudio = require('./webaudio.js')
,   offset = 0
,   audio = new webkitAudioContext()
,   sampleRate = audio.sampleRate
,   duration = 2 * sampleRate  // in samples
,   source = audio.createBufferSource()
,   ab = audio.createBuffer(1, duration, sampleRate)
,   boof = ab.getChannelData(0); //new Float32Array(sampleRate * 2)
;

window.AUDIO = audio
source.connect(audio.destination);


function wave(t, i){

  return Math.sin(t * Math.PI * 2 * 400)

}

var b = webaudio({rate: sampleRate, size: 256, duration: duration + 's'}, wave);

b.on('data', function(buffer, x){
//  console.log(x, offset, boof.length, buffer.length)
  boof.set(buffer, offset)

  offset += 256

})

b.on('end', function(){

  console.log('done', boof, ab);

//  var wav = writeWave({data: boof, sampleRate: 8000, channels : 1, bitDepth : 16})

  source.buffer = ab
  source.noteOn(0);

})


b.resume()

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
  console.log('bpm', e.detail.bpm);
})

window.addEventListener('on', function(e){
  console.log('on');
})

window.addEventListener('off', function(e){
  console.log('off');
})


function toArrayBuffer(buffer) {
    var ab = new ArrayBuffer(buffer.length);
    var view = new Float32Array(ab);
    for (var i = 0; i < buffer.length; ++i) {
        view[i] = buffer[i];
    }
    return ab;
}
