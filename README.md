# Работа с библиотекой - abbot (v0.0.1).

Нумерация версий vA.B.C
+ A -- номер стабильного релиза
+ B -- номер этапа разработки нового релиза
+ C -- номер шага к следующему номеру этапа разработки

Данная библиотека JavaScript предназначена для работы с объектами и сообщениями стандарта DICOM

Полное название библиотеки - Merry the Abbot (веселый аббат), краткое (повседневное) название - 'abbot'.

The Abbot - аббат, служитель в католической церкви, см. легенды о Робин Гуде.
[аббат сохранил золото, аббат принял золото, аббат отдал золото, аббат поделился золотом]

Данная библиотека является переработанной версией библиотеки - ohif-dimse написанной на ES6.

[Исходная библиотека на GitHub](https://github.com/OHIF/dicom-dimse)

Тестирование и эксплуатация на [Node.js](https://nodejs.org/en/download/) - v6 и выше.

Скрипы для демонстрации применения библиотеки имеют общее название - our_test.js, приведены по ходу описания библиотеки
и ни один такой скрипт не присутствует в репозитории GitHub.

Для запуска our_test.js, перейдите в директорию модулей библиотеки создайте тестовый скрипт и запустите:

> node our_test.js



<a id="content"></a>
## Содержание [кладовая аббата]
- [constants.js](#constants)
- [elements_data.js](#element)
- [RWStream.js](#rwstream)
- [Field.js](#field)
- [Data.js](#data)
- [Message.js](#message)
- [PDU.js](#pdu)
- [Connection.js](#connection)
- [Services.js](#services)


<a id="constants"></a>
## constants.js
Модуль групп мульти - констант, определение (выбор) значения на этапе исполнения с помощью __switch__
реализуется выполнением соответствующего кода в __case__. Представляет однотипное ветвление по значению.

```js
// Пример определения мульти - констант в модуле
var C = { ...
TYPE_ASCII : 1,
TYPE_HEX : 2,
TYPE_UINT8 : 3,
TYPE_UINT16 : 4,
TYPE_UINT32 : 5,
TYPE_COMPOSITE : 6,
TYPE_FLOAT : 7,
TYPE_DOUBLE : 8,
TYPE_INT8 : 9,
TYPE_INT16 : 10,
TYPE_INT32 : 11,
...}

// Пример однотипного ветвления по значению
function calcLength(type, value) {
  let size = NaN;
  switch (type) {
    case C.TYPE_HEX    : size = Buffer.byteLength(value, 'hex'); break;
    case C.TYPE_ASCII  : size = Buffer.byteLength(value, 'ascii'); break;
    case C.TYPE_UINT8  : size = 1; break;
    case C.TYPE_UINT16 : size = 2; break;
    case C.TYPE_UINT32 : size = 4; break;
    case C.TYPE_FLOAT  : size = 4; break;
    case C.TYPE_DOUBLE : size = 8; break;
    case C.TYPE_INT8   : size = 1; break;
    case C.TYPE_INT16  : size = 2; break;
    case C.TYPE_INT32  : size = 4; break;
    default :break;
  }
  return size;
}
```

```js
// our_test.js
var C = require('./constants');          //Подключение модуля
console.log( calcLength(C.TYPE_INT8) ); // выбора значения мульти - константы на этапе исполнения


// Вывод:
// -command prompt/> 1
```

[Вернуться к содержанию.](#content)


<a id="elements"></a>
## elements_data.js
Модуль реализует словарь данных стандарта DICOM 3.0, часть PS3.6 - Data Dictionary,
содержит реестр всех DICOM элементов данных [Data Element] и всех уникальных идентификаторов [UID] DICOM,
которые определены в стандарте DICOM. Правильно структурированное множество [Data Set] элементов данных
составляет объект DICOM.

Элемент данных [Data Element] представляет логическую единицу описания атрибута,
представлен единственной записью в словаре данных.

Атрибут - это свойство информационного объекта в модели реального мира DICOM.


Определения терминов в стандарте:

__[Data Element]__: A unit of information as defined by a single entry in the data dictionary. An encoded Information Object Definition (IOD) Attribute that is composed of, at a minimum, three fields: a Data Element Tag, a Value Length, and a Value Field. For some specific Transfer Syntaxes, a Data Element also contains a VR Field where the Value Representation of that Data Element is specified explicitly.

__[Data Set]__: Exchanged information consisting of a structured set of Attribute values directly or indirectly related to Information Objects. The value of each Attribute in a Data Set is expressed as a Data Element. A collection of Data Elements ordered by increasing Data Element Tag number that is an encoding of the values of Attributes of a real world object

__[Attribute]__: A property of an Information Object. An Attribute has a name and a value
that are independent of any encoding scheme.

дополнительные определения см. DICOM PS3.5 2017c - Data Structures and Encoding,
раздел: 3.10 DICOM Data Structures and Encoding Definitions, стр. 22-23.

![data_structures](https://github.com/mikivan1980/abbot/blob/master/docs/img/DICOM_Data_Set_and_Data_Element_Structures.png)


Необходимо стремиться повторить шестой том стандарта при реализации приложений и библиотек предназначенных для работы с
данными в стандарте DICOM. Стандарт предполагает возможность автоматической обработки документа словаря данных (каждый том представлен в формате PDF) для получения пользовательского представления словаря.

Словарные записи стандарта разделены в модуле на два типа словарных записей: __dicomNDict__, __dicomVDict__.
Первый массив содержит описание однозначно определенных тегов элементов данных [Data Element Tag],  
второй - в описании тегов содержит символ 'x', который означает все значения от 0 до F включительно.

```js
// Пример реализации записей словаря в модуле
var dicomNDict = {...
0x0008001B : { vr : "UI", vm : C.VM_SINGLE, keyword : "OriginalSpecializedSOPClassUID"},
0x00080020 : { vr : "DA", vm : C.VM_SINGLE, keyword : "StudyDate"},
0x00080021 : { vr : "DA", vm : C.VM_SINGLE, keyword : "SeriesDate"},
0x00080022 : { vr : "DA", vm : C.VM_SINGLE, keyword : "AcquisitionDate"},
...}


var dicomVDict = {...
"002808x4" : { vr : "US", vm : C.VM_SINGLE, keyword : "BitsForCodeWord"},
"002808x8" : { vr : "AT", vm : C.VM_1N, keyword : "ImageDataLocation"},
"1000xxx0" : { vr : "US", vm : C.VM_THREE, keyword : "EscapeTriplet"},
"1000xxx1" : { vr : "US", vm : C.VM_THREE, keyword : "RunLengthTriplet"},
...}
```

Напомним, что при создании экземпляра Object с использованием нотации литералов, числовые имена свойств автоматически преобразуются в строки.

```js
// our_test.js
var el = require('./elements_data');

console.log(el.dicomNDict[0x00080020]);
console.log(el.dicomVDict["002808x4"]);


// Вывод:
//-command prompt/> { vr: 'DA', vm: 1, keyword: 'StudyDate' }
//-command prompt/> { vr: 'US', vm: 1, keyword: 'BitsForCodeWord' }
```

[Вернуться к содержанию.](#content)


<a id="rwstream"></a>
## RWStream.js
Модуль позволяет создавать два типа объектов - объект поток чтения **ReadStream** и объект поток записи **WriteStream**.
Экземпляры предназначены для работы с потоками чтения и записи данных через необработанный буфер **rawBuffer**.
Самостоятельное использование не предполагается, но возможно.
Экземпляр выступает в качестве аргумента методов чтения или записи объектов представляющих структуры и типы данных стандарта DICOM.

```js
class RWStream {

  constructor() {
    this.endian = C.BIG_ENDIAN;
  }

  setEndian(endian){...}
  getEncoding(type){...}
  getWriteType(type){...}
  getReadType(type){...}
}
```

```js
class WriteStream extends RWStream {

  constructor() {
    super();
    this.defaultBufferSize = 512; //512 bytes
    this.rawBuffer = new Buffer(this.defaultBufferSize);
    this.offset = 0;
    this.contentSize = 0;
  }

  increment(add){...}
  size(){...}
  skip(amount){...}
  checkSize(length){...}
  writeToBuffer(type, value, length){...}
  write(type, value){...}
  writeString(string, type){...}
  buffer(){...}
  concat(newStream){...}
}
```

При создании экземпляра поток чтения или поток записи вызывается конструктор без параметров, создается необработанный буфер
размером 512 байт, с обратным порядком байт записи типизированных значений переменных в буфер.
Порядок записи байт можно изменять с помощью метода **setEndian(endian)**.

<!-- "обратный порядок байтов" – по-английски –"big-endian".
//"прямой порядок байтов", или по-английски "litle-endian". -->

```js
// our_test.js
var C = require('./constants');
var RW = require('./RWStream');

var stream = new RW.WriteStream();
var num = 23423525;

console.log(stream.getWriteType(C.TYPE_UINT32));
stream.write( C.TYPE_UINT32, num);  console.log(stream.rawBuffer);

stream.setEndian(C.LITTLE_ENDIAN);

console.log(stream.getWriteType(C.TYPE_UINT32));
stream.write( C.TYPE_UINT32, num);  console.log(stream.rawBuffer);


// Вывод:
//-command prompt/> writeUInt32BE
//-command prompt/> <Buffer 01 65 6a 25 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ... >
//-command prompt/> writeUInt32LE
//-command prompt/> <Buffer 01 65 6a 25 25 6a 65 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ... >
```

Описание полей и методов:




```js
class RWStream
```
```js
    //Конструктор класса
    constructor() {
        this.endian = C.BIG_ENDIAN;
    }
```

`setEndian(endian)` -- установка прямого или обратного порядка следования байт в буфере.
+ **endian**, значение -- BIG_ENDIAN или LITTLE_ENDIAN

`getEncoding(type)` -- определяет тип кодировки для последовательности байт в буфере.
+ **type**, значение -- TYPE_HEX или TYPE_ASCII

`getWriteType(type)` -- определяет значение type представления данных в буфере для записи.
+ **type**, значение --  TYPE_UINT8, TYPE_UINT16, TYPE_UINT32, TYPE_COMPOSITE, TYPE_FLOAT, TYPE_DOUBLE,
TYPE_INT8, TYPE_INT16, TYPE_INT32.

`getReadType(type)` -- определяет значение type представления данных в буфере для чтения.
+ **type**, значение -- TYPE_UINT8, TYPE_UINT16, TYPE_UINT32, TYPE_COMPOSITE, TYPE_FLOAT, TYPE_DOUBLE,
TYPE_INT8, TYPE_INT16, TYPE_INT32.





Раздел в разработке...



[Вернуться к содержанию.](#content)


<a id="field"></a>
## Field.js
Модуль определяет поле значений [Value Field] элемента данных [Data Element] и предоставляет методы для работы с ним.


```js
class Field {
  constructor(type, value) {
    this.type = type;
    this.value = value;
  }

  length(){...}
  write(stream){...}
  isNumeric(){...}
}
```

```js
// Классы модуля
class Field{...}

class StringField   extends Field{...}
class FilledField   extends Field{...}
class HexField      extends Field{...}
class ReservedField extends Field{...}
class UInt8Field    extends Field{...}
class UInt16Field   extends Field{...}
class UInt32Field   extends Field{...}
class Int8Field     extends Field{...}
class Int16Field    extends Field{...}
class Int32Field    extends Field{...}
class FloatField    extends Field{...}
class DoubleField   extends Field{...}

```

Наследники содержат только конструктор и для числовых полей переопределена функция isNumeric.
Метод write родителя в качестве аргумента требует поток записи и в теле вызывает метод write объекта поток записи.




Раздел в разработке...

[Вернуться к содержанию.](#content)


<a id="data"></a>
## Data.js

```js
// Классы модуля
class ValueRepresentation{...}


class ApplicationEntity   extends ValueRepresentation
class CodeString          extends ValueRepresentation
class AgeString           extends ValueRepresentation
class AttributeTag        extends ValueRepresentation
class DateValue           extends ValueRepresentation
class DecimalString       extends ValueRepresentation
class DateTime            extends ValueRepresentation
class FloatingPointSingle extends ValueRepresentation
class FloatingPointDouble extends ValueRepresentation
class IntegerString       extends ValueRepresentation
class LongString          extends ValueRepresentation
class LongText            extends ValueRepresentation
class PersonName          extends ValueRepresentation
class ShortString         extends ValueRepresentation
class SignedLong          extends ValueRepresentation
class SequenceOfItems     extends ValueRepresentation
class SignedShort         extends ValueRepresentation
class ShortText           extends ValueRepresentation
class TimeValue           extends ValueRepresentation
class UnlimitedCharacters extends ValueRepresentation
class UnlimitedText       extends ValueRepresentation
class UnsignedShort       extends ValueRepresentation
class UnsignedLong        extends ValueRepresentation
class UniqueIdentifier    extends ValueRepresentation
class UniversalResource   extends ValueRepresentation
class UnknownValue        extends ValueRepresentation
class OtherWordString     extends ValueRepresentation



```


Раздел в разработке...

[Вернуться к содержанию.](#content)


<a id="message"></a>
## Message.js

```js
// Классы модуля
class DicomMessage


class DataSetMessage    extends DicomMessage
class CommandMessage    extends DicomMessage
class CommandResponse   extends DicomMessage


class CFindRSP    extends CommandResponse
class CGetRSP     extends CommandResponse
class CMoveRSP    extends CommandResponse
class CStoreRSP   extends CommandResponse


class CFindRQ     extends CommandMessage
class CMoveRQ     extends CommandMessage
class CGetRQ      extends CommandMessage
class CStoreRQ    extends CommandMessage



```


Раздел в разработке...

[Вернуться к содержанию.](#content)


<a id="pdu"></a>
## PDU.js

```js
// Классы модуля
class PDU


class AssociateRQ extends PDU


class AssociateAC    extends AssociateRQ
class AssociateAbort extends PDU
class ReleaseRQ      extends PDU
class ReleaseRP      extends PDU
class PDataTF        extends PDU
class Item           extends PDU


class PresentationDataValueItem     extends Item
class ApplicationContextItem        extends Item
class PresentationContextItem       extends Item
class AbstractSyntaxItem            extends Item
class TransferSyntaxItem            extends Item
class UserInformationItem           extends Item
class ImplementationClassUIDItem    extends Item
class ImplementationVersionNameItem extends Item
class MaximumLengthItem             extends Item


```
Раздел в разработке...

[Вернуться к содержанию.](#content)


<a id="connection"></a>
## Connection.js

Раздел в разработке...

[Вернуться к содержанию.](#content)


<a id="services"></a>
## Services.js

Раздел в разработке...

[Вернуться к содержанию.](#content)


### Примечание.
Полезные ссылки:

1. [Node.js v6.11.2 Documentation](https://nodejs.org/dist/latest-v6.x/docs/api/documentation.html)
2. [Стандарт DICOM (основной сайт)](http://dicom.nema.org/)
3. [Текущая версия](http://dicom.nema.org/medical/dicom/current/)
4. Архив версий стандарта (ftp://medical.nema.org/medical/Dicom)
5. [MARKDOWN SYNTAX](https://learn.getgrav.org/content/markdown)


### Подвал аббата.

| Метод | Опиание |
|-----------------------------------| ----------------------- |
| Начало разработки:                | 9 августа 2017 года     |
| Последнее обновление:             | 14 августа 2017 года    |
| План сбора урожая:                |  21 августа 2017 года   |
| Протестировано на файлах DICOM    | 0 шт.  |



КОНЕЦ.
