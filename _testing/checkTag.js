

//run: D:\dop\node.js\abbot>node ./_testing/checkTag.js
//run: D:\dop\node.js\abbot\_testing>node checkTag.js



const C  = require('../abbot1Constants');
const L  = require('../abbot2Dictionary');


console.log('this is test for checking - checkTag');


let group   =  '0008',
    element =  '0010';


let checkTag = ( group in L.dicomDictionary ) ? ( element in L.dicomDictionary[group] ) :false;


if(checkTag){
    console.log( L.dicomDictionary[group][element] );
}
else console.log('not dictionary!!!');

