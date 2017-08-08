# Документация по библиотеке - abbot.

The Abbot - аббат, служитель в католической церкви, см. легенды о Робин Гуде.
[аббат сохранил золото, аббат принял золото, аббат отдал золото, аббат поделился золотом]

Данная библиотека является переработанной версией библиотеки - ohif-dimse написанной на ES6.

[Исходная библиотека на GitHub](https://github.com/OHIF/dicom-dimse)

Тестирование и эксплуатация [Node.js](https://nodejs.org/en/download/) - v6 и выше.

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
Модуль основных констант, которые применяются в __switch__ для выполнения соответствующего __case__.

Данная библиотека предназначена...

> **console.log(9);** - очень важная функция!!!

`console.log(9);`<!-- комментарий !!!-->

```js
console.log('it is good code !!!');

var F = require('./Field');
var h = new F.HexField('3f');

console.log('end.');
```


## elements_data.js
Модуль реализует словарь данных, позволяет определить название, назначение и типы атрибутов
определенных протоколом DICOM. Стремиться повторить том 6 стандарта.

Данная библиотека предназначена...


## RWStream.js
Модуль управления потоками чтения и записи данных (файловый, сетевой) в raw Buffer.
Данная библиотека предназначена...


## Field.js
Данная библиотека предназначена...

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
3. [Хранилище версий стандарта](http://ftp://medical.nema.org/medical/Dicom)
4. [MARKDOWN SYNTAX](https://learn.getgrav.org/content/markdown)

КОНЕЦ.
