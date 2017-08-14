# Документация по библиотеке abbot (v0.0.1).

Нумерация версий v<A>.<B>.<C>
+ <A> -- <номер стабильного релиза>
+ <B> -- <номер этапа разработки нового релиза>
+ <C> -- <номер шага к следующему номеру этапа разработки>




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




[Вернуться к содержанию.](#content.d)


<a id="elements.d"></a>
## elements_data.js




[Вернуться к содержанию.](#content.d)


<a id="rwstream.d"></a>
## RWStream.js

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
