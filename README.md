# Документация по работе с библиотекой - abbot.

Данная библиотека JavaScript предназначена для работы с объектами и сообщениями стандарта DICOM

Полное название библиотеки - Merry the Abbot (веселый аббат), краткое (повседневное) название - 'abbot'.

The Abbot - аббат, служитель в католической церкви, см. легенды о Робин Гуде.
[аббат сохранил золото, аббат принял золото, аббат отдал золото, аббат поделился золотом]

Данная библиотека является переработанной версией библиотеки - ohif-dimse написанной на ES6.

[Исходная библиотека на GitHub](https://github.com/OHIF/dicom-dimse)

Тестирование и эксплуатация на [Node.js](https://nodejs.org/en/download/) - v6 и выше.

## Содержание [кладовая аббата]
- constants.js
- elements_data.js
- RWStream.js
- Field.js
- Data.js
- Message.js
- PDU.js
- Connection.js
- Services.js


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

//Пример однотипного ветвления по значению, выбора значения мульти - константы на этапе исполнения
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

Подключение в других модулях:
> **var C = require('./constants');**  - важно, расширение не указано! <!-- комментарий !!!-->



## elements_data.js
Модуль реализует словарь данных, позволяет определить название, назначение и типы атрибутов
определенных протоколом DICOM. Стремиться повторить том 6 стандарта.

Данная библиотека предназначена...


## RWStream.js
Модуль управления потоками чтения и записи данных (файловый, сетевой) в raw Buffer.
Данная библиотека предназначена...


## Field.js
Данная библиотека предназначена...

`console.log(9);`<!-- комментарий !!!-->

```js
console.log('it is good code !!!');

var F = require('./Field');
var h = new F.HexField('3f');

console.log('end.');
```

## Data.js
Данная библиотека предназначена...


## Message.js
Данная библиотека предназначена...


## PDU.js
Данная библиотека предназначена...


## Connection.js
Данная библиотека предназначена...


## Services.js
Данная библиотека предназначена...


### Примечание.
Полезные ссылки:

1. [Node.js v6.11.2 Documentation](https://nodejs.org/dist/latest-v6.x/docs/api/documentation.html)
2. [Стандарт DICOM (основной сайт)](http://dicom.nema.org/)
3. [Текущая версия](http://dicom.nema.org/medical/dicom/current/)
4. [Хранилище версий стандарта](http://ftp\://medical.nema.org/medical/Dicom)
5. [MARKDOWN SYNTAX](https://learn.getgrav.org/content/markdown)

КОНЕЦ.
