//lerning of lib abbot


// //Подключаем модуль constants.js
// var C = require('./constants');
//
//
// //------------------------------------------------------------------------------
// //Подключаем следующий модуль elements_data.js - словарь dicom, том 6
 //var El = require('./elements_data');
var El = require('./dictionary');

console.log(  El.dicomNDict['0008']['0006'] );

console.log(  El.dicomNDict['0008']['0006']['vr'] );
console.log(  El.dicomNDict['0008']['0006'].vr    );

console.log(  El.dicomNDict['0008']['0006']['keyword'] );
console.log(  El.dicomNDict['0008']['0006'].keyword  );

//console.log(  El.dicomNDict['0008']['0006'].vr  );

//console.log(  El.dicomNDict['3008']['0047']  );
//console.log(El.dicomNDict[0x00080020]);
//console.log(El.dicomNDict['2306']);
//console.log(El.dicomVDict["002808x4"]);
//
// // //поиграем с типами данными машины и их представлении в буфере для диком
// var RW = require('./RWStream');
//
// var stream = new RW.WriteStream();
// var num = 23423525;
//
// console.log(stream.getWriteType(C.TYPE_UINT32));
// stream.write( C.TYPE_UINT32, num);
// console.log(stream.rawBuffer);
//
// stream.setEndian(C.LITTLE_ENDIAN);
//
// console.log(stream.getWriteType(C.TYPE_UINT32));
// stream.write( C.TYPE_UINT32, num);
// console.log(stream.rawBuffer);


// var RWobject = new RW.RWStream();
//
// console.log(RWobject.getWriteType(C.TYPE_UINT16));
//
// RWobject.setEndian(C.LITTLE_ENDIAN);
//
// console.log(RWobject.getWriteType(C.TYPE_UINT16));

//console.log(RW.RWStream);

// var RW = require('./RWStream');
// var F = require('./Field');
//
//
// var stream = new RW.WriteStream();
//
// //console.log('length buffer of stream_to_write: ' + stream_to_write.defaultBufferSize + '\n');
//
//
// var n = new F.UInt32Field(2378410);
// var h = new F.HexField('3f');
// var s = new F.StringField('Hello world !');
//
// ////если ввести '0x3f' то h будет определена как строка и во втором случае не пойдет в буфер, нет вывода об ошибке
// //console.log('true to stream:  ' + (new F.HexField('3f')).value);
// //console.log('false to stream: ' + (new F.HexField('0x3f')).value);
//
//
// console.log('Type h is ' + h.type);
//
// console.log(stream.buffer());
//
// h.write(stream);
// h.write(stream);
// s.write(stream);
// h.write(stream);
// n.write(stream);
// h.write(stream);
//
// //console.log(stream.offset);
// //console.log(stream.contentSize);
//
// console.log(stream.buffer());


//
// console.log(stream_to_write.rawBuffer);
// //console.log(stream_to_write.rawBuffer.toString('hex'));
//
// // запишем помещенное в буфер в файл асинхронно!!!!
// const fs = require('fs');
// fs.writeFile('test_to_file.txt', stream_to_write.buffer(), (err) => {
//   if (err)  console.log('ERROR...' + err);
//   if (!err) console.log('The file has been saved!');
// });
//




//console.log('\n------/> success...');

//Когда  будем dicom файл помещать в raw Buffer

//var C = require('./constants');
//var RW = require('./RWStream');
//var D = require('./Data');

//const fs = require('fs');

//var DataSet = fs.readFileSync('_test_mr.dcm', 'utf8');

//var DataSet = new RW.ReadStream( fs.readFileSync('_test_mr.dcm', 'ascii') );

//DataSet.increment( 128 + 4 );//+254);



//console.log(  DataSet.more(10).buffer().toString('hex') );
//console.log(  DataSet.read(C.TYPE_UINT16)  );
//console.log(  DataSet.more(10).rawBuffer.slice(0,7));
//console.log( DataSet.read( C.TYPE_UINT16) );


//console.log('endian = = ' + DataSet.endian );


//DataSet.setEndian(C.LITTLE_ENDIAN);


//var el = new D.DataElement();
//el.setSyntax(C.EXPLICIT_LITTLE_ENDIAN);
//el.readBytes(DataSet);


//console.log(el);

//D.readElements( DataSet ) ;//C.EXPLICIT_LITTLE_ENDIAN);



//var a = new Buffer(fs.readFileSync('_test_mr.dcm', 'ascii'));

//console.log(  a.slice(128,134));


//el.readBytes(DataSet);

//var stream = new RW.WriteStream();

//el.write(stream);

//console.log(stream.buffer());

//console.log(DataSet.size());

//console.log(DataSet.buffer().toString());

// fs.readFile('_test_mr.dcm', 'utf8', (err, data) => {
//  if (err) return 'Error: ' + err;
//  else return data;
//    //console.log('read file: ' +  data.length + '\n content: \n' + data.toString());
// });

console.log('\n------/> success...');


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
