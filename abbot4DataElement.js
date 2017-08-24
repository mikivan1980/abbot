
const C = require('./abbot1Constants');
const L = require('./abbot2Dictionary');




function toNumber(){



}




function paddingLeft(paddingValue, string) {
    return String(paddingValue + string).slice(-paddingValue.length);
}


let explicitVRList  =  { "OB":1, "OW":2, "OF":3, "SQ":4, "UC":5, "UR":6, "UT":7, "UN":8},
    binaryVRs       =  [ "FL", "FD", "SL", "SS", "UL", "US"];


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

            this.group = paddingLeft("0000", stream.read(C.TYPE_UINT16).toString(16)).toUpperCase();
            this.element = paddingLeft("0000", stream.read(C.TYPE_UINT16).toString(16)).toUpperCase();

            // прочитали компоненты тега элемента данных, проверяем наличие таких по словарю.

            let checkTag = (this.group in L.dicomDictionary) ? ( this.element in L.dicomDictionary[this.group]) :false;

            if( checkTag ) {

                let entryDictionary = L.dicomDictionary[this.group][this.element];

                this.vr = entryDictionary.vr;
                this.vm = entryDictionary.vm;
                this.discription = entryDictionary.keyword;


                //let checkVReqSQ = !( this.vr === 'SQ' );

                //if ( checkVReqSQ ) {
                    if (this.implicit) {
                        // рассмотрение элемента данных без VR.
                        this.length = stream.read(C.TYPE_UINT32);
                    }
                    else {
                        // рассмотрение элемента данных содержащем VR.
                        let vr = stream.read(C.TYPE_ASCII, 2);
                        //здесь можно было бы проверить совпадение прочитанного vr из потока и полученного из словаря



                        if ( vr in explicitVRList ) {
                            stream.increment(2);
                            this.length = stream.read(C.TYPE_UINT32);
                        } else {
                            this.length = stream.read(C.TYPE_UINT16);
                        }

                    }

                    //let checkGroupLength = !( this.element === '0000' );

                    //if (checkGroupLength) {
                        this.field = new Buffer(stream.buffer().slice(stream.offset, stream.offset + this.length));

                        stream.increment(this.length);

                        this.isDataElement = true;
                //}
                    //else this.field = new Buffer('');
                //}
                //else console.log('[DataElement.DataElementCreateByRead]: find SQ');

            }
            else console.log('[DataElement.DataElementCreateByRead]: false checkTag  (' +  this.group + ', ' +  this.element + ')   for DataElementCreateByRead');

            stream.setEndian(oldEndian);

        }
        else console.log('[DataElement.DataElementCreateByRead]: bad stream for DataElementCreateByRead');

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

    }

    exit(){

        this.isDataElement = false;
        console.log('[DataElement.exit]: error variable metod');
    }


    clear(){

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

    }

    read( stream, syntax ){

        this.clear();
        this.DataElementCreateByRead( stream, syntax );
    }


    write( stream, syntax ){

        let checkStream = ('name' in stream) ? ( stream.name === 'WriteStream' ) : false;

        if( checkStream ) {

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

            //write
            //teg to DataSet
            stream.write();

            //vr to DataSet

            //length

            //thid.buffer


            stream.setEndian(oldEndian);
        }
        else console.log('[DataElement.write]: bad stream for write');

    }


    check(){


    }

}

module.exports.DataElement = DataElement;
