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



<a id="content.d"></a>
## Перейти [лестница аббата]
- [constants.js](#constants.d) <!-- d -- ссылки в documentation.md -->
- [elements_data.js](#element.d)
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
var dicomNDict = {...}
var dicomVDict = {...}
```

`dicomNDict` --  
`dicomVDict` --


[Вернуться к содержанию.](#content.d)


<a id="elements.d"></a>
## elements_data.js




[Вернуться к содержанию.](#content.d)


<a id="rwstream.d"></a>
## RWStream.js
```js
// Функции модуля
function isString(type) {...}
function calcLength(type, value) {...}
```

`isString(type)` --
+ **type** --

`calcLength(type, value)` --
+ **type** --
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

  increment(add){...}
  size(){...}
  skip(amount){...}
  checkSize(length){...}
  writeToBuffer(type, value, length){...}
  write(type, value){...}
  writeString(string, type){...}
  buffer(){...}
  concat(newStream){...}


  ```js
  class ReadStream   extends RWStream
  ```



Раздел в разработке...



[Вернуться к содержанию.](#content.d)


<a id="field.d"></a>
## Field.js





Раздел в разработке...

[Вернуться к содержанию.](#content.d)


<a id="data.d"></a>
## Data.js



Раздел в разработке...

[Вернуться к содержанию.](#content.d)


<a id="message.d"></a>
## Message.js


Раздел в разработке...

[Вернуться к содержанию.](#content.d)


<a id="pdu.d"></a>
## PDU.js
Раздел в разработке...

[Вернуться к содержанию.](#content.d)


<a id="connection.d"></a>
## Connection.js

Раздел в разработке...

[Вернуться к содержанию.](#content.d)


<a id="services.d"></a>
## Services.js

Раздел в разработке...

[Вернуться к содержанию.](#content.d)
