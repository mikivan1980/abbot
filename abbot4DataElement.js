
const C = require('./abbot1Constants');
const L = require('./abbot2Dictionary');


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

        //проверяем, что первый аргумент поток чтения.
        let checkStream = ('name' in stream) ? ( stream.name === 'ReadStream' ) : false;

        if( checkStream ) {

            //если syntax не задан, по умолчанию - DICOM Implicit VR Little Endian Transfer Syntax!!!
            /*                                   */
            this.syntax = C.IMPLICIT_LITTLE_ENDIAN;
            this.implicit = true;
            this.endian = C.LITTLE_ENDIAN;
            if (syntax === C.EXPLICIT_LITTLE_ENDIAN) {
                this.syntax = C.EXPLICIT_LITTLE_ENDIAN;
                this.implicit = false;
                this.endian = C.LITTLE_ENDIAN;
            }
            if (syntax === C.EXPLICIT_BIG_ENDIAN) {
                this.syntax = C.EXPLICIT_BIG_ENDIAN;
                this.implicit = false;
                this.endian = C.BIG_ENDIAN;
            }


            let oldEndian = stream.endian;
            stream.setEndian(this.endian);

            this.group = paddingLeft("0000", stream.read(C.TYPE_UINT16).toString(16));
            this.element = paddingLeft("0000", stream.read(C.TYPE_UINT16).toString(16));

            // прочитали компоненты тега элемента данных, проверяем наличие таких по словарю.

            let checkGroup = (this.group in L.dicomDictionary) ? ( this.element === L.dicomDictionary[this.group]) :false;

            if( checkGroup ) {

                if (this.implicit) {
                    // рассмотрение элемента данных без VR.
                    let entryDictionary = L.dicomDictionary[this.group][this.element];

                    this.vr = entryDictionary.vr;
                    this.vm = entryDictionary.vm;
                    this.discription = entryDictionary.keyword;

                    this.length = stream.read(C.TYPE_UINT32);

                    this.field = new Buffer('');

                }
                else {
                    // рассмотрение элемента данных содержащем VR.


                }
            }

            stream.setEndian(oldEndian);

        }
        else console.log('bad stream for DataElementCreateByRead');

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
