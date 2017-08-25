/*
* Итак, что мы делаем.
*
* isDataSet получает на вход stream, считается, что stream - буфер (Buffer) возвращенный например при чтении файлов DICOM,
* функция устроена так, что на вход может быть подано все что угодно, содержание stream в теле функции помещается в буфер
* т.е. вызывается конструктор new Buffer(stream).
* Такой подход дает осложнение - требуется больше CPU времени, но зато какой бы ни был вход он вначале преобразуется в
* то представление данных на анализ которых расчитана функция. Т.е. случайные входные данные не вызовут аварийного завершения.
* Аварию вызовет то, что не сможет обернуть конструктор Buffer-а.
** А что об этом скажет документация?
*
*
* */


const C = require('../abbot1Constants');
const L = require('../abbot2Dictionary');
const RW  = require('../abbot3Stream');


console.log('[DataSet]');

//isDataSet(fs, 'File');
//isDataSet(ns, 'Net Stream');

function isDataSet( stream, typeSource ){

    let readStream = new RW.ReadStream( stream );

    //readStream.increment( 23 );//для тестирования

    let checkDataElement = true;

    if (typeSource === 'File'){

        console.log('File');

        //1 признак
        //let sum = 0; for(i = 0; i < 32; i++) sum+=readStream.read(C.TYPE_UINT32);
        let checkPrefix = true; for(i = 0; i < 32; i++) checkPrefix = checkPrefix&&( readStream.read(C.TYPE_UINT32) === 0 );

        //2 признак
        let checkSign = (readStream.readString(4,C.TYPE_ASCII) === 'DICM');


        console.log( checkPrefix   + '  ;  ' + checkSign );


    }
    else{
        console.log('Other');
    }


    if(checkDataElement){//делаем анализ, если checkDataElement = true и не был изменен на false в блоке if(typeSource === 'File') {}


    }
    else{
        console.log(' it is not DataSet !!! ');
        return false;
    }

}




const fs = require('fs');

let DataSet = new Buffer( fs.readFileSync('../_testing/dcm/_test_mr.dcm') );


//isDataSet(DataSet,'File');

isDataSet('tyritvurhtgjkrn','File');

