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
- [abbot1Constants.js](#constants)
- [abbot2Dictionary.js](#elements)
- [abbot3Stream.js](#rwstream)
- [Field.js](#field)
- [Data.js](#data)
- [Message.js](#message)
- [PDU.js](#pdu)
- [Connection.js](#connection)
- [Services.js](#services)


<a id="constants"></a>
## abbot1Constants.js
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

[Документация](https://github.com/mikivan1980/abbot/blob/master/docs/documentation.md)

[Вернуться к содержанию.](#content)


<a id="elements"></a>
## abbot2Dictionary.js
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
let dicomDictionary = {
    '0008' : {
              '0001' : { vr : "UL", vm : C.VM_SINGLE,   keyword : "LengthToEnd"},
              '0005' : { vr : "CS", vm : C.VM_1N,       keyword : "SpecificCharacterSet"},
              '0006' : { vr : "SQ", vm : C.VM_SINGLE,   keyword : "LanguageCodeSequence"},
              '0008' : { vr : "CS", vm : C.VM_2N,       keyword : "ImageType"},
              '0010' : { vr : "SH", vm : C.VM_SINGLE,   keyword : "RecognitionCode"},
...}


let dicomPrivateDictionary = {
  "002031xx" : { vr : "CS", vm : C.VM_1N,       keyword : "SourceImageIDs"},
  "002804x0" : { vr : "US", vm : C.VM_SINGLE,   keyword : "RowsForNthOrderCoefficients"},
  "002804x1" : { vr : "US", vm : C.VM_SINGLE,   keyword : "ColumnsForNthOrderCoefficients"},
  "002804x2" : { vr : "LO", vm : C.VM_1N,       keyword : "CoefficientCoding"},
  "002804x3" : { vr : "AT", vm : C.VM_1N,       keyword : "CoefficientCodingPointers"},
...}
```

Напомним, что при создании экземпляра Object с использованием нотации литералов, числовые имена свойств автоматически преобразуются в строки.

```js
// our_test.js
const L = require('./abbot2Dictionary'); // L - library

console.log(  L.dicomDictionary['0008']['0006'] );

console.log(  L.dicomDictionary['0008']['0006']['vr'] );
console.log(  L.dicomDictionary['0008']['0006'].vr    );

console.log(  L.dicomDictionary['0008']['0006']['keyword'] );
console.log(  L.dicomDictionary['0008']['0006'].keyword  );


// Вывод:
//-command prompt/> { vr: 'SQ', vm: 1, keyword: 'LanguageCodeSequence' }
//-command prompt/> SQ
//-command prompt/> SQ
//-command prompt/> LanguageCodeSequence
//-command prompt/> LanguageCodeSequence

```

[Вернуться к содержанию.](#content)


<a id="rwstream"></a>
## abbot3Stream.js
Модуль позволяет создавать два типа объектов - объект поток чтения **ReadStream** и объект поток записи **WriteStream**.
Экземпляры предназначены для работы с потоками чтения и записи данных через необработанный буфер **rawBuffer**.
Самостоятельное использование не предполагается, но возможно.
Экземпляр выступает в качестве аргумента методов чтения или записи объектов представляющих структуры и типы данных стандарта DICOM.

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


Раздел в разработке...



[Вернуться к содержанию.](#content)


<a id="field"></a>
## Field.js
Модуль предназначен для определения поля значения [Value Field] элемента данных [Data Element] и предоставляет методы для работы с ним.


```js
var RW = require('./RWStream');
var F = require('./Field');


var stream = new RW.WriteStream();


var n = new F.UInt32Field(2378410);
var h = new F.HexField('3f');
var s = new F.StringField('Hello world !');

console.log('Type h is ' + h.type);

console.log(stream.buffer());

h.write(stream);
h.write(stream);
s.write(stream);
h.write(stream);
n.write(stream);
h.write(stream);

console.log(stream.buffer());

// Вывод:
//-command prompt/> Type h is 2
//-command prompt/> <Buffer >
//-command prompt/> <Buffer 3f 3f 48 65 6c 6c 6f 20 77 6f 72 6c 64 20 21 3f 00 24 4a aa 3f>
```

Метод write родителя в качестве аргумента требует поток записи и в теле вызывает метод write объекта поток записи.


Раздел в разработке...

[Вернуться к содержанию.](#content)


<a id="data"></a>
## Data.js
Модуль предназначен для представления объектов из раздела 7, в DICOM PS3.5 2017c - Data Structures and Encoding

The Data Set

The Data Elements in a Data Set shall be ordered by increasing Data Element Tag Number and shall occur at most once in a Data Set.
Элементы данных [Data Elements] в наборе данных DICOM [Data Set] упорядочены по номеру тега элемента данных и должны встречаться не более одного раза в наборе данных.
Тег элемента данных может повторяться снова в наборах вложенных данных (см. Раздел 7.5).

Определены два типа элементов данных:

+ `Стандартные элементы данных` имеют четный номер группы,
который не является (0000, eeee), (0002, eeee), (0004, eeee) или (0006, eeee).
Использование этих групп зарезервировано для команд DIMSE (см. PS3.7) и форматов файлов DICOM.

+ `Частные элементы данных` имеют нечетный номер группы, который не является (0001, eeee), (0003, eeee), (0005, eeee), (0007, eeee) или (FFFF, eeee). Частные элементы данных обсуждаются далее в разделе 7.8.

Хотя аналогичные или связанные элементы данных часто имеют одинаковый номер группы; Группа данных не передает семантический смысл, начиная с версии DICOM 3.0.

Элемент данных [Data Element] должен иметь одну из трех структур:
+ Элемент данных [Data Element] содержит VR - (Explicit VR)
    + EXPLICIT_LITTLE_ENDIAN : "1.2.840.10008.1.2.1" - (прямой порядком байт записи целых чисел - длинны поля)
    + EXPLICIT_BIG_ENDIAN : "1.2.840.10008.1.2.2" - (обратным порядком байт записи целых чисел - длинны поля)
+ Элемент данных [Data Element] не содержит VR - (Implicit VR) - IMPLICIT_LITTLE_ENDIAN : "1.2.840.10008.1.2"

 Все три структуры обязательно содержат тег элемента данных [Data Elements Tag], длину [Length] и значение поля [Value Field] для элемента данных.

Элементы данных с Explicit VR и Implicit VR не должны сосуществовать в наборе данных и наборах данных, вложенных в него (см. Раздел 7.5). Независимо от того, использует ли Explicit VR или Implicit VR, среди других характеристик, определяется согласованный синтаксис передачи [negotiated Transfer Syntax] (см. Раздел 10 и приложение А).

page 48


Раздел в разработке...

[Вернуться к содержанию.](#content)


<a id="message"></a>
## Message.js


Раздел в разработке...
webstorm



[Вернуться к содержанию.](#content)


<a id="pdu"></a>
## PDU.js


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
