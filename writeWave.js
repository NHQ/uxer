var Buffer = require('buffer').Buffer;

// procedure ripped from https://github.com/TooTallNate/node-wav/blob/master/lib/writer.js

module.exports = function(argv){


var RIFF = new Buffer('RIFF');
var WAVE = new Buffer('WAVE');
var fmt  = new Buffer('fmt ');
var data = new Buffer('data');
var endianness = 'LE';

  var headerLength = 44;

  var dataLength = argv.data.length;

  var fileSize = dataLength + headerLength;
  var header = new Buffer(headerLength);
  var offset = 0;

  // write the "RIFF" identifier
  RIFF.copy(header, offset);
  offset += RIFF.length;
    
  // write the file size minus the identifier and this 32-bit int
  header['writeUInt32' + endianness](fileSize - 8, offset);
  offset += 4;

  // write the "WAVE" identifier
  WAVE.copy(header, offset);
  offset += WAVE.length;

  // write the "fmt " sub-chunk identifier
  fmt.copy(header, offset);
  offset += fmt.length;

  // write the size of the "fmt " chunk
  // XXX: value of 16 is hard-coded for raw PCM format. other formats have
  // different size.
  header['writeUInt32' + endianness](16, offset);
  offset += 4;

  // write the audio format code
  header['writeUInt16' + endianness](1, offset);
  offset += 2;

  // write the number of channels
  header['writeUInt16' + endianness](argv.channels, offset);
  offset += 2;

  // write the sample rate
  header['writeUInt32' + endianness](argv.sampleRate, offset);
  offset += 4;

  // write the byte rate
  var byteRate = argv.sampleRate * argv.channels * argv.bitDepth / 8;

  header['writeUInt32' + endianness](byteRate, offset);
  offset += 4;

  // write the block align
  var blockAlign = argv.channels * argv.bitDepth / 8;
 
  header['writeUInt16' + endianness](blockAlign, offset);
  offset += 2;

  // write the bits per sample
  header['writeUInt16' + endianness](argv.bitDepth, offset);
  offset += 2;

  // write the "data" sub-chunk ID
  data.copy(header, offset);
  offset += data.length;

  // write the remaining length of the rest of the data
  header['writeUInt32' + endianness](dataLength, offset);
  offset += 4;

  var wav = new Buffer(headerLength + dataLength)

  header.copy(wav, 0);

  argv.data.copy(wav, 44);

  return toArrayBuffer(wav)

}

function toArrayBuffer(buffer) {
    var ab = new ArrayBuffer(buffer.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buffer.length; ++i) {
        view[i] = buffer[i];
    }
    return ab;
}
