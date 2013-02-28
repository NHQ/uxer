var baudio = require('baudio')
,   writeWave = require('../writeWave')
,   fs = require('fs')
,   wav = require('wav')
,   sampleRate = 8000
,   offset = 0
,   sampleSize = 2 // 16 bits == 2 bytes
,   bufSize = 256
,   duration = 20 // seconds or samples q.v. '8000s'
,   buf = new Buffer(sampleSize * sampleRate * duration)
,   b = baudio({rate: sampleRate, duration: duration, size: bufSize})
,   tau = Math.PI * 2
,   writer = new wav.FileWriter('./test.wav', {channels: 1, samplerate: sampleRate})
;

b.push(function(t, i){
console.log(t, i)
  return Math.sin(t * tau * 440)

})

b.on('data', function(buffer){

//  console.log(buffer.length, offset)

  buffer.copy(buf, offset);

  offset += bufSize

})

b.on('end', function(){
  console.log('done');

  var wav = writeWave({data: buf, sampleRate: sampleRate, channels : 1, bitDepth : 16})

  fs.writeFile('./testwave.wav', wav, function(){console.log('written')})

})
b.pipe(writer)
b.resume()
