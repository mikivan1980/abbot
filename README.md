# Документация по работе с библиотекой - abbot.

Данная библиотека JavaScript предназначена для работы с объектами и сообщениями стандарта DICOM

Полное название библиотеки - Merry the Abbot (веселый аббат), краткое (повседневное) название - 'abbot'.

The Abbot - аббат, служитель в католической церкви, см. легенды о Робин Гуде.
[аббат сохранил золото, аббат принял золото, аббат отдал золото, аббат поделился золотом]

Данная библиотека является переработанной версией библиотеки - ohif-dimse написанной на ES6.

[Исходная библиотека на GitHub](https://github.com/OHIF/dicom-dimse)

Тестирование и эксплуатация на [Node.js](https://nodejs.org/en/download/) - v6 и выше.


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

// выбора значения мульти - константы на этапе исполнения
console.log( calcLength(C.TYPE_INT8) );
// command prompt/> 1
```

Подключение в других модулях:
> **var C = require('./constants');**  - важно, расширение не указано! <!-- комментарий не видно!!!-->

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

![data_structures](https://github.com/mikivan1980/abbot/blob/master/img/DICOM_Data_Set_and_Data_Element_Structures.png)


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

> Наш тестовый скрипт для демонстрации применения библиотеки -  our_test.js,
> ни один такой файл не присутствует в репозитории GitHub

```js
// our_test.js
var el = require('./elements_data');

console.log(el.dicomNDict[0x00080020]);
console.log(el.dicomVDict["002808x4"]);


// Вывод:
//-command prompt/> { vr: 'DA', vm: 1, keyword: 'StudyDate' }
//-command prompt/> { vr: 'US', vm: 1, keyword: 'BitsForCodeWord' }
```

Напомним, что при создании экземпляра Object с использованием нотации литералов, числовые имена свойств автоматически преобразуются в строки.

[Вернуться к содержанию.](#content)


<a id="rwstream"></a>
## RWStream.js
Модуль позволяет создавать два типа объектов - объект поток чтения **ReadStream** и объект поток записи **WriteStream**.
Экземпляры предназначены для работы с потоками чтения и записи данных через необработанный буфер **rewBuffer**.



Раздел в разработке...



[Вернуться к содержанию.](#content)


<a id="field"></a>
## Field.js
Данная библиотека предназначена...




`console.log(9);`<!-- комментарий !!!-->

```js
console.log('it is good code !!!');

var F = require('./Field');
var h = new F.HexField('3f');

console.log('end.');
```

[Вернуться к содержанию.](#content)


<a id="data"></a>
## Data.js
Данная библиотека предназначена...

[Вернуться к содержанию.](#content)


<a id="message"></a>
## Message.js
Данная библиотека предназначена...


<a id="pdu"></a>
## PDU.js
Данная библиотека предназначена...


<a id="connection"></a>
## Connection.js
Данная библиотека предназначена...

<a id="services"></a>
## Services.js
Данная библиотека предназначена...


### Примечание.
Полезные ссылки:

1. [Node.js v6.11.2 Documentation](https://nodejs.org/dist/latest-v6.x/docs/api/documentation.html)
2. [Стандарт DICOM (основной сайт)](http://dicom.nema.org/)
3. [Текущая версия](http://dicom.nema.org/medical/dicom/current/)
4. Архив версий стандарта (ftp://medical.nema.org/medical/Dicom)
5. [MARKDOWN SYNTAX](https://learn.getgrav.org/content/markdown)

КОНЕЦ.
