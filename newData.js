
const C = require('./constants');



class DataElement {
    constructor( metod, a, b, c, d, e, f){

        this.isDataElement = false;

        this.group = null;
        this.element = null;
        this.vr = null;
        this.vm = null;
        this.length = null;

        this.syntax = null;
        this.endian = null;
        this.implicit = null;

        this.field = null;

        if( metod === 'Read' ) this.DataElementCreateByRead(a, b);
        if( metod === 'Hand' ) this.DataElementcreateByHand(a,b,c,d,e,f);
        else this.exit();

    }

    DataElementCreateByRead( a, b ){ // strean, syntax

        this.syntax = b;
        this.implicit = (this.syntax === C.IMPLICIT_LITTLE_ENDIAN) ? true : false;
        this.endian = (this.syntax === C.IMPLICIT_LITTLE_ENDIAN || this.syntax === C.EXPLICIT_LITTLE_ENDIAN) ? C.LITTLE_ENDIAN : C.BIG_ENDIAN;

        this.group = a.read(C.TYPE_UINT16);
        this.element = a.read(C.TYPE_UINT16);



        console.log('read' + a + b );

    }


    DataElementcreateByHand( a, b, c, d, e, f ){//group, element, vr, vm, fieldBuffer, syntax

        this.group = a;
        this.element = b;
        this.vr = c;
        this.vm = d;

        this.field = new Buffer( e );
        this.length = field.lengthBytes;

        this.syntax = f;
        this.implicit = this.syntax == C.IMPLICIT_LITTLE_ENDIAN ? true : false;
        this.endian = (this.syntax == C.IMPLICIT_LITTLE_ENDIAN || this.syntax == C.EXPLICIT_LITTLE_ENDIAN) ? C.LITTLE_ENDIAN : C.BIG_ENDIAN;


        console.log('hand' + a + b + c + d + e);
    }

    exit(){

        console.log('error variable metod');
    }




}

module.exports.DataElement = DataElement;
