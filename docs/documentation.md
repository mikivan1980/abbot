# Документация по библиотеке abbot (v0.0.1).

Нумерация версий vA.B.C
+ A -- номер стабильного релиза
+ B -- номер этапа разработки нового релиза
+ C -- номер шага к следующему номеру этапа разработки

Node.js имеет собственную модульную систему, на момент написания данной документации процесс поддержки
модулей ES6 не решен. Без API функций Node невозможно установить Tcp/Ip соединение с удаленным
DICOM сервером для обмена данными, поэтому в библиотеке используется модульная система Node!

Для перехода от одной модульной системы к другой, достаточно заменить:

```js
// Модульная система Node
var calcLength = require('./RWStream').calcLength;
// Модульная система ES6
import { calcLength as calcLength } from './RWStream';
````


<!-- d = ссылки в documentation.md -->
<a id="content.d"></a>
## Перейти [лестница аббата]
- [constants.js](#constants.d)
- [elements_data.js](#elements.d)
- [RWStream.js](#rwstream.d)
- [Field.js](#field.d)
- [Data.js](#data.d)
- [Message.js](#message.d)
- [PDU.js](#pdu.d)
- [Connection.js](#connection.d)
- [Services.js](#services.d)




<a id="constants.d"></a>
## constants.js
```js
var C = {...}
```

`C` -- коллекция групп мульти - констант библиотеки, позволяет осуществить однотипное ветвление по значению.  


[Вернуться к содержанию.](#content.d)


<a id="elements.d"></a>
## elements_data.js
```js
var dicomNDict = {...}
var dicomVDict = {...}
```

`dicomNDict` -- одно-однозначное отношение тег - атрибут записи словаря данных, определены в томе 6 стандарта.
`dicomVDict` -- много-однозначное отношение тег - атрибут записи словаря данных, определены в томе 6 стандарта.


[Вернуться к содержанию.](#content.d)


<a id="rwstream.d"></a>
## RWStream.js
```js
// Функции модуля
function isString(type) {...}
function calcLength(type, value) {...}
```

`isString(type)` -- определяет является ли тип строковым, верно только при значении **type** - TYPE_HEX, TYPE_ASCII.
+ **type**, значение -- TYPE_HEX, TYPE_ASCII, TYPE_UINT8, TYPE_UINT16, TYPE_UINT32, TYPE_COMPOSITE, TYPE_FLOAT, TYPE_DOUBLE,
TYPE_INT8, TYPE_INT16, TYPE_INT32

`calcLength(type, value)` -- вычисление длинны типа представленного значения - value.
+ **type** --  значение -- TYPE_HEX, TYPE_ASCII, TYPE_UINT8, TYPE_UINT16, TYPE_UINT32, TYPE_COMPOSITE, TYPE_FLOAT, TYPE_DOUBLE,
TYPE_INT8, TYPE_INT16, TYPE_INT32
+ **value** --

```js
// Классы модуля
class RWStream{...}

class WriteStream  extends RWStream
class ReadStream   extends RWStream
```


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


```js
class WriteStream extends RWStream
```
```js
    //Конструктор класса
    constructor() {
        super();
        this.defaultBufferSize = 512; //512 bytes
        this.rawBuffer = new Buffer(this.defaultBufferSize);
        this.offset = 0;
        this.contentSize = 0;
     }
```  

`size()` -- определяет длину контента помещенного в поток записи.

`increment(add)` -- увеличивает смещения offset на значение add, проверка на offset > this.rawBuffer.length не производится.

`skip(amount)` -- это `increment(amount)`

`checkSize(length)` -- проверяет, возможность записи в поток записи length байт с позиции offset, если это невозможно
создает буфер большего размера.

`writeToBuffer(type, value, length)` -- помещает значение value в поток записи как тип type занимая length байт буфера,
ничего не происходит в случае, если value === "" или value === null, проверка на length_in_bytes(value) > length не производиться,
при необходимости размер буфера потока записи увеличивается автоматически (применяется checkSize(length)).

`write(type, value)` --  помещает значение value в поток записи как тип type, вычисляется длинна типа calcLength(type).

`writeString(string, type)` --

`buffer()` -- возвращает буфер содержащий только контент потока записи.

`concat(newStream)` -- добавляет к текущему потоку записи поток чтения или записи (только контент) - newStream.


  ```js
  class ReadStream   extends RWStream
  ```
  ```js
      //Конструктор класса  
      constructor(buffer) {
          super();
          this.rawBuffer = buffer;
          this.offset = 0;
      }
```

`size()` -- возвращает размер буфер (контента) в потоке чтения.

`increment(add)` -- увеличение this.offset на add, проверка на this.offset > this.rawBuffer.length не производится.

`more(length)` -- возвращает поток чтения с буфером длинной length, буфер нового потока чтения копия с текущего буфера потока чтения с позиции this.offset.

`reset()` -- возвращает текущий поток чтения, смещением возвращено в начало буфер потока чтения.

`end()` -- вазращает true, когда this.offset >= this.size(), иначе false.

`readFromBuffer(type, length)` -- возвращает значение прочтенное из буфера потока чтения как тип type, производится изменение смещения на length.

`read(type, length)` -- аналогична write(type, value) потока записи, прочитать значение из потока чтения как тип type.

`readString(length, type)` --

`buffer()` -- возвращает буфер потока чтения.

`concat(newStream)` --  добавляет к текущему потоку чтения поток чтения или записи (только контент) - newStream.

Раздел в разработке...


[Вернуться к содержанию.](#content.d)


<a id="field.d"></a>
## Field.js
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

```js
class Field
```
```js  
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
```    

`length()` -- определяет длину значения поля.

`write(stream)` -- помещает значение value в поток записи stream.

`isNumeric()` -- всегда возвращает false.


```js
class StringField   extends Field
class HexField      extends Field
```
```js  
    constructor(value) {
        super(#type_from_name, str);
    }
```
+ **#type_from_name**, значение -- C.TYPE_ASCII для StringField, C.TYPE_HEX для HexField.


```js
class FilledField   extends Field
```
```js  
    constructor(value, length) {
        super(C.TYPE_COMPOSITE, value);
        this.fillLength = length;
    }
```


```js
class ReservedField extends Field
```
```js  
    constructor(length) {
         length = length || 1;
         super(C.TYPE_HEX, "00".repeat(length));
    }
```


```js
class UInt8Field    extends Field
class UInt16Field   extends Field
class UInt32Field   extends Field
class Int8Field     extends Field
class Int16Field    extends Field
class Int32Field    extends Field
class FloatField    extends Field
class DoubleField   extends Field
```
Классы имеют схожие конструкторы, отличаясь предопределенным значением параметра #type_from_name.
```js  
    constructor(value) {
        super(#type_from_name, value);
    }
```
+ **#type_from_name**, значение параметра --  TYPE_UINT8 для UInt8Field, TYPE_UINT16 для UInt16Field, TYPE_UINT32 для UInt32Field,
TYPE_INT8 для Int8Field, TYPE_INT16 для Int16Field, TYPE_INT32 для Int32Field, TYPE_FLOAT для FloatField, TYPE_DOUBLE для DoubleField.

`isNumeric()` -- всегда возвращает true.


[Вернуться к содержанию.](#content.d)


<a id="data.d"></a>
## Data.js
```js
// Функции модуля
function paddingLeft(paddingValue, string) {...}

function rtrim(str) {...}
function ltrim(str) {...}

function fieldsLength(fields) {...}

function tagFromNumbers(group, element) {...}
function readTag(stream) {...}

function parseElements(stream, syntax) {...}

function elementByType(type, value, syntax) {...}
function elementDataByTag(tag) {...}
function elementKeywordByTag(tag) {...}

function vrByType(type) {...}

function readElements(stream, syntax) {...}
```

`paddingLeft(paddingValue, string)` -- производит конкатенацию параметров с обрезанием справа на длину первого параметра.
когда второй параметр string пустая строка - '', выводом будет первый аргумент и наоборот.
+ **paddingValue** -- строка заполнитель, задет и длину выводимой строки.
+ **string** -- расширяемая строка

`rtrim(str)` -- убирает пробелы справа в строке - str, недоступна вне модуля (нет экспорта).

`ltrim(str)` -- убирает пробелы слева в строке - str, недоступна вне модуля (нет экспорта).

`fieldsLength(fields)` -- ,недоступна вне модуля (нет экспорта).
+ **fields** --

`tagFromNumbers(group, element)` -- возвращает экземпляр Tag, недоступна вне модуля (нет экспорта).
+ **group** -- числовое значение (hex) номера группы
+ **element** -- числовое значение (hex) номера элемента

`readTag(stream)` -- возвращает Tag, последовательно читает два значение C.TYPE_UINT16 из представленного
stream экземпляра потока чтения, недоступна вне модуля (нет экспорта).
+ **stream** -- поток чтения.

`parseElements(stream, syntax)` --
+ **stream** -- поток чтения содержащий [Data Set]
+ **syntax** --



```js
// Классы модуля
class Tag{...}

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
```js
class Tag
```
```js
    constructor(value) {
        this.value = value;
    }
```

`toString()` -- возвращает значение тега в виде строки.

`is(t)` -- возвращает численное значение тега.

`group()` --  возвращает численное значение номера группы тега.

`element()` -- возвращает численное значение номера элемента тега.

```js
class ValueRepresentation
```
```js
    constructor(type) {
        this.type = type;
        this.multi = false;
    }
```

`read(stream, length, syntax)`  --

`readBytes(stream, length)` --

`readNullPaddedString(stream, length)` --

`getFields(fields)` --




Раздел в разработке...

[Вернуться к содержанию.](#content.d)


<a id="message.d"></a>
## Message.js
```js
// Функции модуля


```

```js
// Классы модуля
class DicomMessage{...}


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

[Вернуться к содержанию.](#content.d)


<a id="pdu.d"></a>
## PDU.js
```js
// Функции модуля


```

```js
// Классы модуля
class PDU{...}


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

[Вернуться к содержанию.](#content.d)


<a id="connection.d"></a>
## Connection.js
```js
// Функции модуля


```

```js
// Классы модуля


```

Раздел в разработке...

[Вернуться к содержанию.](#content.d)


<a id="services.d"></a>
## Services.js
```js
// Функции модуля


```

```js
// Классы модуля


```


Раздел в разработке...

[Вернуться к содержанию.](#content.d)
