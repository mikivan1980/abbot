/*
* Итак, что мы делаем.
*
*
* Существуют источники данных: файловая система, network.
* Источник поставляет/принимает информацию (DICOM объекты) в виде потока байт.
* Выделяют API для представления источника в Buffer.
* let sourceBuffer = new Buffer( source ); - источник в виде буфера - потока байт
*
*
* sourceBuffer либо оборачивается в поток чтения, либо подготавливается для дальнейшей передачи в источник.
*
* из потока чтения
*
*
* let elem = new DataElement( DataSet );
*
* elem.readFrom(DataSet);
*
* elem.group === '0010'
*
* elem.writeTo( DataSet );
*
*
*
*
*
* ReadStream оборачивает любой вход в Buffer, все что съедобно для конструктора new Buffer( source )
* можно подавать через source.
*
* isDataSet получает на вход stream, считается, что stream - буфер (Buffer) возвращенный например при чтении файлов DICOM,
* функция устроена так, что на вход может быть подано все что угодно, содержание stream в теле функции помещается в буфер
* т.е. вызывается конструктор new Buffer(stream).
* Такой подход дает осложнение - требуется больше CPU времени, но зато какой бы ни был вход он вначале преобразуется в
* то представление данных на анализ которых расчитана функция. Т.е. случайные входные данные не вызовут аварийного завершения.
* Аварию вызовет то, что не сможет обернуть конструктор Buffer-а.
** А что об этом скажет документация?
*
* Так, время определиться с дизайном классов.
*
*
* */


const C   = require('../abbot1Constants');
const L   = require('../abbot2Dictionary');
const RW  = require('../abbot3Stream');




//======================================================================================================================
function paddingLeft(paddingValue, string) {
    return String(paddingValue + string).slice(-paddingValue.length);
}


//======================================================================================================================
/* Тег элемента данных состоит из идентификатора группы и идентификатора элемента,
* каждый тег идентифицирует единственую запись словаря данных.
* чтобы ни было поддано на вход, значение true будет только для правильно заданных group, element
* и при наличии этих значений в словаре данных.
* Функции для применения в модуле, вне модуля не видна.
* */
function checkTag( group, element ){
    return (( group in L.dicomDictionary ) ? ( element in L.dicomDictionary[group] ) :false);
}


//======================================================================================================================
/* функция возвращает запись словаря сответствующую правильно заданным компонентам тега, иначе {}
* Функции для применения в модуле, вне модуля не видна.
* */
function showTag( group, element ){ //была printTag
    if( checkTag( group, element ) ) {
        return L.dicomDictionary[group][element];}
    else { return {}; }
}



//======================================================================================================================
//узкие контракты!!
function checkDataElement_IMPLICIT_LITTLE_ENDIAN( stream ){


}

function checkDataElement_EXPLICIT_LITTLE_ENDIAN( stream ){


}



function checkDataElement_EXPLICIT_BIG_ENDIAN( stream ){


};




//======================================================================================================================
function checkTagOnStream( stream ){
    //проверяем, что stream поток чтения, а не что-то другое.
    let checkStream = ('name' in stream) ? ( stream.name === 'ReadStream' ) : false;

    if( checkStream ) {

        let currentStat = {
            Endian: stream.endian,
            Implicit: stream.implicit
        };


        let outputCheck = {Little: {}, Big: {}};

        stream.setEndian(C.LITTLE_ENDIAN);

        let groupTest = paddingLeft("0000", stream.read(C.TYPE_UINT16).toString(16)).toUpperCase();
        let elementTest = paddingLeft("0000", stream.read(C.TYPE_UINT16).toString(16)).toUpperCase();

        outputCheck.Little.check   = checkTag(groupTest, elementTest);
        outputCheck.Little.group   = groupTest;
        outputCheck.Little.element = elementTest;

        stream.increment(-4);

        stream.setEndian(C.BIG_ENDIAN);

        groupTest = paddingLeft("0000", stream.read(C.TYPE_UINT16).toString(16)).toUpperCase();
        elementTest = paddingLeft("0000", stream.read(C.TYPE_UINT16).toString(16)).toUpperCase();

        outputCheck.Big.check   = checkTag(groupTest, elementTest);
        outputCheck.Big.group   = groupTest;
        outputCheck.Big.element = elementTest;

        //console.log(outputCheck);

        stream.setEndian(currentStat.Endian);

        return outputCheck;

    }
    else{
        console.log('[checkTagOnStream]: Input stream is not ReadStream. ');
        return null;
    }

}


//======================================================================================================================
/* Функция проверки гипотезы о существовании Data Element на потоке чтения.
 * Вход: только stream - поток чтения, синтаксис определен на потоке через stream.endian и stream.implicit.
 * Вывод: false ( когда элемент не найден stream.offset сдвигается только на один байт от исходного положения),
 *        true  ( когда Data Element найден и stream.offset сдвигается на длинну найденного Data Element),
 *        null  ( когда подан неверный поток.)*/

function hypothesisExistenceDataElementOn( stream ){
    //проверяем, что stream поток чтения, а не что-то другое.
    let checkStream = ('name' in stream) ? ( stream.name === 'ReadStream' ) : false;

    if( checkStream ) {

        let check1 = checkTagOnStream( stream );
        console.log(check1);





    }
    else{
        console.log('[hypothesisExistenceDataElementOn]: Input stream is not ReadStream. ');
        return null;
    }

}
//test
const fs = require('fs');

let DataSetIvan = new RW.ReadStream( fs.readFileSync('D://dop/node.js/abbot/_testing/dcm/_test_mr.dcm') );
DataSetIvan.increment( 128 + 4 );

for(count = 1; count < 14; count++) {

    hypothesisExistenceDataElementOn( DataSetIvan );

}
console.log('end test._._.._');




//======================================================================================================================
/*
* Функции для применения в модуле, вне модуля не видна.
* */
function checkDataSet( stream ){
    output = {
        isDataSet    : false,
        beginDataSet : null,
        endDataSet   : null,
        countLevel_0 : 0,
        syntax       : null
    };

    //проверяем, что stream поток чтения, а не что-то другое.
    let checkStream = ('name' in stream) ? ( stream.name === 'ReadStream' ) : false;

    if( checkStream ) {

        let offsetStream = stream.offset;
        let endianStream = stream.endian;


//входим в цикл while не достигнем конца stream

        stream.setEndian(C.BIG_ENDIAN);

        let groupTest   = paddingLeft("0000", stream.read(C.TYPE_UINT16).toString(16)).toUpperCase();
        let elementTest = paddingLeft("0000", stream.read(C.TYPE_UINT16).toString(16)).toUpperCase();

        let checkBigEndian = checkTag( groupTest, elementTest );

        stream.increment(-4);

        stream.setEndian(C.LITTLE_ENDIAN);

        groupTest   = paddingLeft("0000", stream.read(C.TYPE_UINT16).toString(16)).toUpperCase();
        elementTest = paddingLeft("0000", stream.read(C.TYPE_UINT16).toString(16)).toUpperCase();

        let checkLittleEndian = checkTag( groupTest, elementTest );

//получаем четыре возможных состояния
// (checkBigEndian , checkLittleEndian) - (false,false) - следующий байт тоже и (true, true)?, хотя не столь очевидно что зднмь нет Data Element
//(true,false)  or (false, true)






        //stream.setEndian(this.endian);

        srteam.offset = offsetStream;
        stream.setEndian(endianStream);

        return output;
    }
    else return output;
}





//??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
console.log( checkTag('0008', '0006' ) );
console.log( printTag('0008', '0006' ) );


console.log('[DataSet]');



class DataSet{
    /* Экземпляр DataSet может быть получен из потока чтения или содержать хотябы один Data Element,
    * поэтому конструктор принимает 'ReadSrteam' или 'DataElement' и ничего другого.
    * */
    constructor( stream, syntax ){

        this.name = 'DataSet';

        this.isDataSet1 = false;

        this.syntax   = null;
        this.endian   = null;
        this.implicit = null;

        this.bufferDataSet = null;

        //проверяем, что первый аргумент поток чтения.
        let checkStream = ('name' in stream) ? ( stream.name === 'ReadStream' ) : false;

        if( checkStream ) {


        }

    }


    selectDataElement( group, element ){
        /*по заданным group, element ищем в this.bufferDataSet  элемент данны и возвращает его*/

    }

    updateDataElement(DataElement){
        /*bmbm*/



    }

    insertDataElement(DataElement){



    }

    deleteDataElement( group, element ){



    }

    next(){


    }


}
module.exports.DataSet = DataSet;





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


        checkDataElement = checkPrefix&&checkSign;


        console.log( checkPrefix + '  ;  ' + checkSign );


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




//const fs = require('fs');

let DataSet1 = new Buffer( fs.readFileSync('D://dop/node.js/abbot/_testing/dcm/_test_mr.dcm') );


isDataSet(DataSet1,'File');

//isDataSet('tyritvurhtgjkrn','File');

