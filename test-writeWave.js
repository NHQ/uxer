makeWave = require('./makeWave.js')
makeWave = require('./writeWave.js')
buf = new Buffer(16 * 16000)
for ( x = 0; x < buf.lengthg; x +=2 ) {
process.hrtime
process.hrtime()

process.hrtime()[1]
sampleRate = 8000
sampleSize = 16
time = 0
for ( x = 0; x , buf.length; x +=2 ) {
Baudio = require('baudio')
b = baudio({size:256, rate:8000, duration: 2000}, function(t){
  return Math.sin(t * Math.PI * 2 * 440)})
b = Baudio({size:256, rate:8000, duration: 2000}, function(t){
  return Math.sin(t * Math.PI * 2 * 440)})
b.on('data', function(buffer){
  buffer.copy(buf, x)
  x += 256
  })
x = 0
