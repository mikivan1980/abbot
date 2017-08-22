
const C    = require('./abbot1Constants');
const Dict = require('./abbot2Dictionary');


function paddingLeft(paddingValue, string) {
    return String(paddingValue + string).slice(-paddingValue.length);
};



class DataElement {
    constructor( metod, a, b, c, d, e, f){

        this.isDataElement = false;
        this.discription   = null;

        this.group    = null;
        this.element  = null;
        this.vr       = null;
        this.vm       = null;
        this.length   = null;

        this.syntax   = null;
        this.endian   = null;
        this.implicit = null;

        this.field    = null;

        if( metod === 'Read' ) this.DataElementCreateByRead(a,b);
        if( metod === 'Hand' ) this.DataElementcreateByHand(a,b,c,d,e,f);
        else this.exit();

    }

    DataElementCreateByRead( stream, syntax ){

        this.isDataElement = false;

        //если syntax не задан, по умолчанию - DICOM Implicit VR Little Endian Transfer Syntax!!!
          /*                                   */    this.syntax = C.IMPLICIT_LITTLE_ENDIAN;  this.implicit = true;  this.endian = C.LITTLE_ENDIAN;
        if( syntax === C.EXPLICIT_LITTLE_ENDIAN )  { this.syntax = C.EXPLICIT_LITTLE_ENDIAN;  this.implicit = false; this.endian = C.LITTLE_ENDIAN; }
        if( syntax === C.EXPLICIT_BIG_ENDIAN    )  { this.syntax = C.EXPLICIT_BIG_ENDIAN;     this.implicit = false; this.endian = C.BIG_ENDIAN; }


        let oldEndian = stream.endian;
        stream.setEndian(this.endian);

        this.group   =  paddingLeft("0000", stream.read(C.TYPE_UINT16).toString(16));
        this.element =  paddingLeft("0000", stream.read(C.TYPE_UINT16).toString(16));

        if(this.implicit){
            let dictEntry = Dict.dicomNDict['group']['element'];
            this.vr = dictEntry.vr;
            this.vm = dictEntry.vm;
            this.discription = dictEntry.keyword;
            this.length = stream.read(C.TYPE_UINT32);

            this.field = new Buffer();

        }
        else{


        }




        stream.setEndian(oldEndian);

       // console.log('read' + a + b );

    }


    DataElementcreateByHand( group, element, vr, vm, valueField, syntax ){ //group, element, vr, vm, fieldBuffer, syntax

        this.isDataElement = false;

        this.group   = group;
        this.element = element;
        this.vr      = vr;
        this.vm      = vm;

        this.field   = new Buffer( valueField );
        this.length  = field.lengthBytes;

        //если syntax не задан, по умолчанию - DICOM Implicit VR Little Endian Transfer Syntax!!!
          /*                                   */    this.syntax = C.IMPLICIT_LITTLE_ENDIAN;  this.implicit = true;  this.endian = C.LITTLE_ENDIAN;
        if( syntax === C.EXPLICIT_LITTLE_ENDIAN )  { this.syntax = C.EXPLICIT_LITTLE_ENDIAN;  this.implicit = false; this.endian = C.LITTLE_ENDIAN; }
        if( syntax === C.EXPLICIT_BIG_ENDIAN    )  { this.syntax = C.EXPLICIT_BIG_ENDIAN;     this.implicit = false; this.endian = C.BIG_ENDIAN; }


        this.isDataElement = false;

        //console.log('hand' + a + b + c + d + e);
    }

    exit(){

        this.isDataElement = false;
        console.log('error variable metod');
    }




}

module.exports.DataElement = DataElement;
