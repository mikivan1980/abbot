
const C = require('../abbot1Constants');
const L = require('../abbot2Dictionary');
const RW  = require('../abbot3Stream');


console.log('[DataSet]');

//isDataSet(fs, 'File');
//isDataSet(ns, 'Net Stream');

function isDataSet( stream, typeSource ){

    let readStream = new RW.ReadStream( stream );

    //readStream.increment( 23 );//для тестирования

    if (typeSource === 'File'){

        console.log('File');

        //1 признак
        //let sum = 0; for(i = 0; i < 32; i++) sum+=readStream.read(C.TYPE_UINT32);
        let checkPrefix = true; for(i = 0; i < 32; i++) checkPrefix = checkPrefix&&( readStream.read(C.TYPE_UINT32) === 0 );

        //2 признак
        let checkSign = (readStream.readString(4,C.TYPE_ASCII) === 'DICM');


        console.log( checkSign + '  ;  ' + checkPrefix );


    }
    else{
        console.log('Other');
    }


}




const fs = require('fs');

let DataSet = new Buffer( fs.readFileSync('../_testing/dcm/_test_mr.dcm') );


isDataSet(DataSet,'File');