
const C = require('./abbot1Constants');
const L = require('./abbot2Dictionary');


function paddingLeft(paddingValue, string) {
    return String(paddingValue + string).slice(-paddingValue.length);
};


let explicitVRList  =  ["OB", "OW", "OF", "SQ", "UC", "UR", "UT", "UN"],
    binaryVRs       =  ["FL", "FD", "SL", "SS", "UL", "US"];


class DataElement {
    constructor( metod, a, b, c, d, e, f){

        this.name = 'DataElement';

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

        switch( metod ) {

            case 'Read': this.DataElementCreateByRead(a,b); break;
            case 'Hand': this.DataElementcreateByHand(a,b,c,d,e,f); break;

            default: this.exit();
        }

        //if( metod === 'Read' ) this.DataElementCreateByRead(a,b);
        //if( metod === 'Hand' ) this.DataElementcreateByHand(a,b,c,d,e,f);
        //else this.exit();

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

            let checkTag = (this.group in L.dicomDictionary) ? ( this.element in L.dicomDictionary[this.group]) :false;

            if( checkTag ) {

                if (this.implicit) {
                    // рассмотрение элемента данных без VR.
                    let entryDictionary = L.dicomDictionary[this.group][this.element];

                    this.vr = entryDictionary.vr;
                    this.vm = entryDictionary.vm;
                    this.discription = entryDictionary.keyword;

                    this.length = stream.read(C.TYPE_UINT32);

                    this.field = new Buffer(  stream.buffer().slice( stream.offset, stream.offset + this.length )  );

                    stream.increment(this.length);

                }
                else {
                    // рассмотрение элемента данных содержащем VR.
                    let entryDictionary = L.dicomDictionary[this.group][this.element];

                    this.vr = entryDictionary.vr;
                    this.vm = entryDictionary.vm;
                    this.discription = entryDictionary.keyword;

                    let vr = stream.read(C.TYPE_ASCII, 2);

                    //здесь можно было бы проверить совпадение прочитанного vr из потока и полученного из словаря


                    if ( vr in explicitVRList ) {
                        stream.increment(2);
                        this.length = stream.read(C.TYPE_UINT32);
                    } else {
                        this.length = stream.read(C.TYPE_UINT16);
                    }


                    this.field = new Buffer( stream.buffer().slice( stream.offset, stream.offset + this.length ) );

                    stream.increment(this.length);

                }
            }
            else console.log('[DataElement.DataElementCreateByRead]: false checkTag for DataElementCreateByRead');

            stream.setEndian(oldEndian);

        }
        else console.log('[DataElement.DataElementCreateByRead]: bad stream for DataElementCreateByRead');

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
        console.log('[DataElement.exit]: error variable metod');
    }



    read( stream, syntax ){

        this.DataElementCreateByRead( stream, syntax );

    }






}

module.exports.DataElement = DataElement;
