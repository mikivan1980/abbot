



const C  = require('../abbot1Constants');
const L  = require('../abbot2Dictionary');
const RW  = require('../abbot3Stream');

console.log('[tagNumberFromString]');


let valueTest = '1080';


let rezult = Number( '0x' + valueTest );

console.log(rezult);

for(i=0;i<3;i++){

    let stream = new RW.WriteStream();//создаваемый внутри объекта буфер не пуст, простое выделение памяти на куче. а что говорит документация?

    stream.endian = C.LITTLE_ENDIAN;
    stream.write(C.TYPE_UINT16, rezult );

    //console.trace();
    console.log(stream);
}












