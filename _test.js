//lerning of lib abbot


//Подключаем модуль constants.js
var C = require('./constants');


//------------------------------------------------------------------------------
//Подключаем следующий модуль elements_data.js - словарь dicom, том 6
var El = require('./elements_data');


//поиграем с типами данными машины и их представлении в буфере для диком
var RW = require('./RWStream');
var F = require('./Field');


var stream_to_write = new RW.WriteStream();

console.log('length buffer of stream_to_write: ' + stream_to_write.defaultBufferSize + '\n');

console.log(stream_to_write.rawBuffer);

var h = new F.HexField('3f');
//если ввести '0x3f' то h будет определена как строка и во втором случае не пойдет в буфер, нет вывода об ошибке
console.log('true to stream:  ' + (new F.HexField('3f')).value);
console.log('false to stream: ' + (new F.HexField('0x3f')).value);


console.log('type h it ' + h.type);

var s = new F.StringField('Hello world adm Mik!!!!');

h.write(stream_to_write);
h.write(stream_to_write);
s.write(stream_to_write);
h.write(stream_to_write);

console.log(stream_to_write.offset);
console.log(stream_to_write.contentSize);

console.log(stream_to_write.rawBuffer);
//console.log(stream_to_write.rawBuffer.toString('hex'));

// запишем помещенное в буфер в файл асинхронно!!!!
const fs = require('fs');
fs.writeFile('test_to_file.txt', stream_to_write.buffer(), (err) => {
  if (err)  console.log('ERROR...' + err);
  if (!err) console.log('The file has been saved!');
});





console.log('\n------/> success...');

// //Когда  будем dicom файл помещать в raw Buffer
// const fs = require('fs');
// fs.readFile('RWStream.js', 'utf8', (err, data) => {
//   if (err) return 'Error: ' + err; return data;
//   //console.log('read file: ' +  data.length + '\n content: \n' + data.toString());
// });
//
// const arr = new Uint16Array(2);
//
// arr[0] = 5000;
// arr[1] = 4000;
//
// // Shares memory with `arr`
// const buf = new Buffer(arr.buffer);
//
// // Prints: <Buffer 88 13 a0 0f>
// //console.log(buf);
//
// // Changing the original Uint16Array changes the Buffer also
// arr[1] = 6000;
//
// // Prints: <Buffer 88 13 70 17>
// //console.log(buf);
