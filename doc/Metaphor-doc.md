# Документация XML-формата «Метафора» (journal3)

**Источник:** `doc/xsd/journal3 образец из Метафоры.xsd`

---

## Общая структура

Корневой элемент `<journal>` содержит метаданные журнала, информацию о выпуске и список статей. Все дочерние элементы внутри `<journal>` и `<issue>` используют модель `choice`/`all` — порядок следования не строго фиксирован.

```xml
<?xml version="1.0" encoding="utf-16" standalone="no"?>
<journal>
  <operCard>...</operCard>
  <titleid>...</titleid>
  <issn>...</issn>
  <eissn>...</eissn>
  <codeNEB>...</codeNEB>
  <journalInfo lang="...">...</journalInfo>
  <journalInfo lang="...">...</journalInfo>
  <issue>
    <volume>...</volume>
    <number>...</number>
    <altNumber>...</altNumber>
    <dateUni>...</dateUni>
    <part>...</part>
    <pages>...</pages>
    <issTitle lang="...">...</issTitle>
    <codes>...</codes>
    <files>...</files>
    <articles>
      <!-- section и/или article -->
    </articles>
  </issue>
</journal>
```

---

## 1. Элементы верхнего уровня `<journal>`

### 1.1 `<operCard>` — карточка оператора (необязательный)

Содержит служебную информацию об операторе, который подготовил XML.

| Поле | Тип | Обязательность | Описание |
|------|-----|----------------|----------|
| `date` | `string` | нет | Дата формирования XML |
| `cntArticle` | `byte` | нет | Количество статей в выпуске |
| `cs` | `byte` | нет | Контрольная сумма или код |
| `operator` | `string` | нет | Имя/идентификатор оператора |

**Пример:**
```xml
<operCard>
  <date>2026-05-12</date>
  <cntArticle>15</cntArticle>
  <cs>1</cs>
  <operator>Иванов И.И.</operator>
</operCard>
```

---

### 1.2 `<titleid>` — идентификатор журнала в РИНЦ (необязательный)

| Поле | Тип | Описание |
|------|-----|----------|
| текстовое содержимое | `string` | Уникальный идентификатор журнала в системе РИНЦ |

**Пример:**
```xml
<titleid>11982</titleid>
```

---

### 1.3 `<issn>` — ISSN печатной версии (необязательный)

| Поле | Тип | Описание |
|------|-----|----------|
| текстовое содержимое | `string` | ISSN печатного издания |

**Пример:**
```xml
<issn>1816-9791</issn>
```

---

### 1.4 `<eissn>` — ISSN электронной версии (необязательный)

| Поле | Тип | Описание |
|------|-----|----------|
| текстовое содержимое | `string` | ISSN электронного издания |

**Пример:**
```xml
<eissn>2541-9005</eissn>
```

---

### 1.5 `<codeNEB>` — код НЭБ (необязательный)

| Поле | Тип | Описание |
|------|-----|----------|
| текстовое содержимое | `string` | Код в Национальной электронной библиотеке |

**Пример:**
```xml
<codeNEB>12345</codeNEB>
```

---

### 1.6 `<journalInfo>` — информация о журнале (необязательный, повторяющийся)

Элемент может повторяться для разных языков. Язык задаётся атрибутом `lang`.

**Атрибуты:**

| Атрибут | Тип | Обязательность | Описание |
|---------|-----|----------------|----------|
| `lang` | `string` | нет | Код языка (`RUS`, `ENG` и т.д.) |

**Дочерние элементы:**

| Поле | Тип | Обязательность | Описание |
|------|-----|----------------|----------|
| `title` | `string` | нет | Название журнала (нижний регистр тега) |
| `Title` | `string` | нет | Название журнала (верхний регистр тега — альтернативный вариант) |
| `abbrTitle` | `string` | нет | Сокращённое название журнала |
| `publ` | `string` | нет | Издательство |
| `placePubl` | `string` | нет | Место издания (город) |
| `address` | `string` | нет | Адрес издательства/редакции |

**Пример:**
```xml
<journalInfo lang="RUS">
  <title>Известия Саратовского университета. Новая серия. Серия: Математика. Механика. Информатика</title>
  <abbrTitle>Изв. Сарат. ун-та. Нов. сер. Сер. Математика. Механика. Информатика</abbrTitle>
  <publ>Издательство Саратовского университета</publ>
  <placePubl>Саратов</placePubl>
  <address>410012, Саратов, ул. Астраханская, 83</address>
</journalInfo>
<journalInfo lang="ENG">
  <title>Izvestiya of Saratov University. Mathematics. Mechanics. Informatics</title>
  <abbrTitle>Izv. Saratov Univ. Math. Mech. Inform.</abbrTitle>
  <publ>Saratov University Press</publ>
  <placePubl>Saratov</placePubl>
</journalInfo>
```

---

## 2. `<issue>` — информация о выпуске (необязательный)

Содержит метаданные конкретного выпуска журнала и все статьи.

### 2.1 Основные поля выпуска

| Поле | Тип | Обязательность | Описание |
|------|-----|----------------|----------|
| `volume` | `string` | нет | Том (Volume) |
| `number` | `string` | нет | Номер выпуска |
| `altNumber` | `string` | нет | Альтернативный номер выпуска |
| `dateUni` | `string` | нет | Год издания (универсальная дата) |
| `part` | `string` | нет | Часть выпуска |
| `pages` | `string` | нет | Общий диапазон страниц выпуска (формат: `начало-конец`) |

**Пример:**
```xml
<volume>6</volume>
<number>1</number>
<dateUni>2006</dateUni>
<pages>1-120</pages>
```

---

### 2.2 `<issTitle>` — название выпуска (необязательный)

| Атрибут | Тип | Обязательность | Описание |
|---------|-----|----------------|----------|
| `lang` | `string` | нет | Код языка |

Текстовое содержимое — название выпуска на указанном языке.

**Пример:**
```xml
<issTitle lang="RUS">Специальный выпуск</issTitle>
```

---

### 2.3 `<codes>` — коды выпуска (необязательный)

Содержит идентификаторы выпуска (DOI, EDN).

| Поле | Тип | Кратность | Описание |
|------|-----|-----------|----------|
| `doi` | `string` | 0..1 | DOI выпуска |
| `edn` | `string` | 0..1 | EDN (идентификатор в eLibrary) |

**Пример:**
```xml
<codes>
  <doi>10.18500/1816-9791-2006-6-1</doi>
  <edn>ABCDEF</edn>
</codes>
```

---

### 2.4 `<files>` — файлы выпуска (необязательный)

Содержит вложенные элементы `<file>`.

| Элемент | Кратность | Описание |
|---------|-----------|----------|
| `file` | 0..unbounded | Файл, прикреплённый к выпуску |

**`<file>` — атрибуты:**

| Атрибут | Тип | Обязательность | Описание |
|---------|-----|----------------|----------|
| `desc` | `string` | нет | Описание файла (например, `fullText`, `cover`) |
| `fullText` | `string` | нет | Признак полнотекстового файла |

Текстовое содержимое — имя файла.

**Пример:**
```xml
<files>
  <file desc="cover" fullText="yes">cover_2006_6_1.pdf</file>
</files>
```

---

## 3. `<articles>` — статьи выпуска (обязательный внутри `<issue>`)

Контейнер для секций и статей. Может содержать в произвольном порядке:

- `<section>` — секция/рубрика выпуска
- `<article>` — статья

Оба элемента могут чередоваться в любом порядке и повторяться произвольное число раз.

---

### 3.1 `<section>` — секция выпуска (необязательный, повторяющийся)

Представляет рубрику или тематическую секцию выпуска.

| Поле | Тип | Кратность | Описание |
|------|-----|-----------|----------|
| `secTitle` | mixed | 1..unbounded | Название секции на разных языках |

**`<secTitle>`:**

| Атрибут | Тип | Обязательность | Описание |
|---------|-----|----------------|----------|
| `lang` | `string` | нет | Код языка (`RUS`, `ENG`) |

Текстовое содержимое может включать произвольную HTML-разметку (mixed content).

**Пример:**
```xml
<section>
  <secTitle lang="RUS">Математический анализ</secTitle>
  <secTitle lang="ENG">Mathematical Analysis</secTitle>
</section>
```

---

### 3.2 `<article>` — статья (необязательный, повторяющийся)

Основной элемент, описывающий отдельную статью.

Содержит следующие дочерние элементы (в произвольном порядке):

---

#### 3.2.1 `<langPubl>` — язык публикации (необязательный)

| Поле | Тип | Описание |
|------|-----|----------|
| текстовое содержимое | `string` | Код языка статьи (`RUS`, `ENG` и т.д.) |

---

#### 3.2.2 `<pages>` — страницы (необязательный)

| Поле | Тип | Описание |
|------|-----|----------|
| текстовое содержимое | `string` | Диапазон страниц (`начало-конец`) или одна страница |

---

#### 3.2.3 `<artType>` — тип статьи (необязательный)

| Поле | Тип | Описание |
|------|-----|----------|
| текстовое содержимое | `string` | Аббревиатура типа статьи (например, `JA` — Journal Article) |

---

#### 3.2.4 `<codes>` — коды и классификаторы статьи (необязательный, 0..1)

| Поле | Тип | Кратность | Описание |
|------|-----|-----------|----------|
| `doi` | `string` | 0..1 | DOI статьи |
| `edn` | `string` | 0..1 | EDN (идентификатор eLibrary) |
| `udk` | `string` | 0..unbounded | УДК (универсальный десятичный классификатор) |
| `bbk` | `string` | 0..unbounded | ББК (библиотечно-библиографический классификатор) |
| `vak` | `string` | 0..1 | Код ВАК |
| `vak21` | `string` | 0..1 | Код ВАК (новый перечень) |
| `jel` | `string` | 0..unbounded | Код JEL (Journal of Economic Literature) |
| `msc` | `string` | 0..unbounded | Код MSC (Mathematics Subject Classification) |
| `pacs` | `string` | 0..unbounded | Код PACS (Physics and Astronomy Classification Scheme) |
| `anycode` | `string` | 0..unbounded | Произвольный код классификатора |

**Пример:**
```xml
<codes>
  <doi>10.18500/1816-9791-2006-6-1-12-20</doi>
  <edn>HJKLMN</edn>
  <udk>517.9</udk>
  <msc>35K05</msc>
</codes>
```

---

#### 3.2.5 `<authors>` — авторы статьи (необязательный)

Контейнер для элементов `<author>`.

**`<author>` — атрибуты:**

| Атрибут | Тип | Обязательность | Описание |
|---------|-----|----------------|----------|
| `num` | `byte` | нет | Порядковый номер автора в списке |
| `id` | `string` | нет | Идентификатор автора |

**Дочерние элементы `<author>` (в произвольном порядке):**

##### `<role>` — роль автора (необязательный)

| Поле | Тип | Описание |
|------|-----|----------|
| текстовое содержимое | `string` | Роль (`author`, `reviewer` и т.д.) |

##### `<correspondent>` — соответствующий автор (необязательный)

| Поле | Тип | Описание |
|------|-----|----------|
| текстовое содержимое | `string` | Признак corresponding author |

##### `<individInfo>` — персональная информация (обязательный, 1..3)

Информация об авторе на конкретном языке. Минимум 1, максимум 3 экземпляра.

| Атрибут | Тип | Обязательность | Описание |
|---------|-----|----------------|----------|
| `lang` | `string` | **да** | Код языка (`RUS`, `ENG`) |

**Дочерние элементы `<individInfo>`:**

| Поле | Тип | Кратность | Описание |
|------|-----|-----------|----------|
| `surname` | mixed | 1 | Фамилия автора (**обязательное**) |
| `initials` | mixed | 0..1 | Инициалы автора |
| `bio` | mixed | 0..1 | Биография |
| `address` | mixed | 0..1 | Адрес |
| `town` | mixed | 0..1 | Город |
| `country` | mixed | 0..1 | Страна |
| `otherInfo` | mixed | 0..1 | Прочая информация |
| `comment` | mixed | 0..1 | Комментарий |
| `commentDate` | `string` | 0..1 | Дата комментария |
| `orgName` | mixed | 0..1 | Название организации (атрибут `notAuthentic`) |
| `email` | mixed | 0..1 | Email (атрибут `notAuthentic`) |

**Атрибуты `orgName` и `email`:**

| Атрибут | Тип | Описание |
|---------|-----|----------|
| `notAuthentic` | `string` | Признак недостоверности данных |

> Поля `surname`, `initials`, `bio`, `address`, `town`, `country`, `otherInfo`, `comment`, `orgName` поддерживают mixed content — могут содержать HTML-разметку внутри.

**Пример:**
```xml
<individInfo lang="RUS">
  <surname>Иванов</surname>
  <initials>И.И.</initials>
  <orgName>Саратовский национальный исследовательский государственный университет</orgName>
  <address>410012, Саратов, ул. Астраханская, 83</address>
  <email>ivanov@mail.ru</email>
</individInfo>
<individInfo lang="ENG">
  <surname>Ivanov</surname>
  <initials>I.I.</initials>
  <orgName>Saratov State University</orgName>
  <address>83 Astrakhanskaya St., Saratov, 410012, Russia</address>
  <email>ivanov@mail.ru</email>
</individInfo>
```

##### `<authorCodes>` — идентификаторы автора (необязательный)

| Поле | Тип | Обязательность | Описание |
|------|-----|----------------|----------|
| `scopusid` | `string` | нет | Идентификатор Scopus Author ID |
| `researcherid` | `string` | нет | Идентификатор Web of Science ResearcherID |
| `orcid` | `string` | нет | ORCID |
| `spin` | `string` | нет | SPIN-код РИНЦ (eLibrary) |

**Пример:**
```xml
<authorCodes>
  <scopusid>571927xxx</scopusid>
  <researcherid>A-1234-2015</researcherid>
  <orcid>0000-0001-2345-6789</orcid>
  <spin>1234-5678</spin>
</authorCodes>
```

##### `<country>` — страна автора (необязательный)

| Поле | Тип | Описание |
|------|-----|----------|
| текстовое содержимое | `string` | Страна |

---

#### 3.2.6 `<artTitles>` — заголовки статьи (необязательный)

Контейнер для элементов `<artTitle>`.

| Элемент | Кратность | Описание |
|---------|-----------|----------|
| `artTitle` | 1..unbounded | Заголовок статьи на языке |

**`<artTitle>`:**

| Атрибут | Тип | Обязательность | Описание |
|---------|-----|----------------|----------|
| `lang` | `string` | нет | Код языка (`RUS`, `ENG`) |

Текстовое содержимое — название статьи (mixed content, поддерживает HTML-разметку).

**Пример:**
```xml
<artTitles>
  <artTitle lang="RUS">Предельное распределение ранга дружбы в сложных сетях</artTitle>
  <artTitle lang="ENG">Limiting distribution of friendship rank in complex networks</artTitle>
</artTitles>
```

---

#### 3.2.7 `<abstracts>` — аннотации (необязательный)

Контейнер для элементов `<abstract>`.

| Элемент | Кратность | Описание |
|---------|-----------|----------|
| `abstract` | 0..unbounded | Аннотация на языке |

**`<abstract>`:**

| Атрибут | Тип | Обязательность | Описание |
|---------|-----|----------------|----------|
| `lang` | `string` | **да** | Код языка (`RUS`, `ENG`) |

Текстовое содержимое — текст аннотации (mixed content, поддерживает HTML-разметку).

**Пример:**
```xml
<abstracts>
  <abstract lang="RUS">В работе изучается предельное распределение...</abstract>
  <abstract lang="ENG">In this paper we study the limiting distribution...</abstract>
</abstracts>
```

---

#### 3.2.8 `<text>` — полный текст (необязательный)

| Атрибут | Тип | Обязательность | Описание |
|---------|-----|----------------|----------|
| `lang` | `string` | нет | Код языка (обычно `ANY`) |

Текстовое содержимое — полный текст статьи или ссылка на него.

**Пример:**
```xml
<text lang="ANY">Полный текст статьи...</text>
```

---

#### 3.2.9 `<keywords>` — ключевые слова (необязательный)

Контейнер для групп ключевых слов.

| Элемент | Кратность | Описание |
|---------|-----------|----------|
| `kwdGroup` | 0..unbounded | Группа ключевых слов на одном языке |

**`<kwdGroup>`:**

| Атрибут | Тип | Обязательность | Описание |
|---------|-----|----------------|----------|
| `lang` | `string` | нет | Код языка группы (`RUS`, `ENG`) |

**Дочерние элементы `<kwdGroup>`:**

| Элемент | Кратность | Описание |
|---------|-----------|----------|
| `keyword` | 0..unbounded | Отдельное ключевое слово (mixed content) |

**Пример:**
```xml
<keywords>
  <kwdGroup lang="RUS">
    <keyword>сложные сети</keyword>
    <keyword>ранг дружбы</keyword>
    <keyword>предельное распределение</keyword>
  </kwdGroup>
  <kwdGroup lang="ENG">
    <keyword>complex networks</keyword>
    <keyword>friendship rank</keyword>
    <keyword>limiting distribution</keyword>
  </kwdGroup>
</keywords>
```

---

#### 3.2.10 `<rubrics>` — рубрики (необязательный, 0..1)

Контейнер для рубрик статьи.

| Элемент | Кратность | Описание |
|---------|-----------|----------|
| `rubric` | 1..unbounded | Название рубрики (`string`) |

**Пример:**
```xml
<rubrics>
  <rubric>Математический анализ</rubric>
</rubrics>
```

---

#### 3.2.11 `<dates>` — даты (необязательный, 0..1)

Содержит ключевые даты жизненного цикла статьи.

| Поле | Тип | Кратность | Описание |
|------|-----|-----------|----------|
| `dateReceived` | `string` | 0..1 | Дата поступления в редакцию |
| `dateAccepted` | `string` | 0..1 | Дата принятия к публикации |
| `datePublication` | `string` | 0..1 | Дата публикации |

**Пример:**
```xml
<dates>
  <dateReceived>2025-09-15</dateReceived>
  <dateAccepted>2026-01-20</dateAccepted>
  <datePublication>2026-03-01</datePublication>
</dates>
```

---

#### 3.2.12 `<references>` — список литературы (необязательный, 0..1)

Контейнер для ссылок на литературу.

| Элемент | Кратность | Описание |
|---------|-----------|----------|
| `reference` | 0..unbounded | Отдельная библиографическая ссылка |

**`<reference>` — mixed content, содержит:**

| Элемент | Кратность | Описание |
|---------|-----------|----------|
| `refInfo` | 0..unbounded | Информация о ссылке на конкретном языке |

**`<refInfo>`:**

| Атрибут | Тип | Обязательность | Описание |
|---------|-----|----------------|----------|
| `lang` | `string` | **да** | Код языка (`RUS`, `ENG`, `ANY`) |

**Дочерние элементы `<refInfo>`:**

| Элемент | Кратность | Описание |
|---------|-----------|----------|
| `text` | 1 | Текст библиографической ссылки (mixed content) |
| `elements` | 0..1 | Структурированные элементы ссылки |

**`<elements>` → `<element>`:**

Структурированный разбор библиографической ссылки. Каждый `<element>` имеет:

| Атрибут | Тип | Обязательность | Описание |
|---------|-----|----------------|----------|
| `field` | `string` | **да** | Название поля (`author`, `title`, `source`, `year`, `volume`, `pages`, `doi` и т.д.) |

Содержимое `<element>` — mixed content, может включать форматирование:

| Тег | Описание |
|-----|----------|
| `i` / `I` | Курсив |
| `b` / `B` | Полужирный |
| `sup` / `SUP` | Верхний индекс |
| `sub` / `SUB` | Нижний индекс |
| `br` / `BR` | Перенос строки |
| `tex` / `TEX` | TeX-формула |

Все теги форматирования могут быть вложены друг в друга произвольным образом.

**Пример:**
```xml
<references>
  <reference>
    <refInfo lang="ANY">
      <text>Ivanov I.I. On some problem // Math. J. 2025. Vol. 10. P. 15-20.</text>
      <elements>
        <element field="author">Ivanov I.I.</element>
        <element field="title">On some problem</element>
        <element field="source">Math. J.</element>
        <element field="year">2025</element>
        <element field="volume">10</element>
        <element field="pages">15-20</element>
      </elements>
    </refInfo>
  </reference>
</references>
```

---

#### 3.2.13 `<files>` — файлы статьи (необязательный, 0..1)

Файлы, прикреплённые к статье. Содержит `<file>` и/или `<furl>`.

**`<file>` — локальный файл (0..unbounded):**

| Атрибут | Тип | Обязательность | Описание |
|---------|-----|----------------|----------|
| `desc` | `string` | нет | Описание (`fullText`, `abstract` и т.д.) |
| `lang` | `string` | нет | Код языка файла |

Текстовое содержимое — имя файла.

**`<furl>` — файл по URL (0..unbounded):**

| Атрибут | Тип | Обязательность | Описание |
|---------|-----|----------------|----------|
| `lang` | `string` | нет | Код языка |
| `desc` | `string` | нет | Описание |
| `location` | `string` | нет | Расположение файла |
| `version` | `string` | нет | Версия файла |

Текстовое содержимое — URL файла.

**Пример:**
```xml
<files>
  <file desc="fullText">article_12345.pdf</file>
  <furl desc="fullText" lang="ANY">https://example.com/articles/12345.pdf</furl>
</files>
```

---

#### 3.2.14 `<fundings>` — источники финансирования (необязательный, 0..1)

Контейнер для элементов `<funding>`.

| Элемент | Кратность | Описание |
|---------|-----------|----------|
| `funding` | 0..unbounded | Источник финансирования |

**`<funding>`:**

| Атрибут | Тип | Обязательность | Описание |
|---------|-----|----------------|----------|
| `lang` | `string` | нет | Код языка |

Текстовое содержимое — описание гранта/источника финансирования.

---

#### 3.2.15 `<artFunding>` — финансирование статьи (необязательный, 0..1)

Структура идентична `<fundings>`. Контейнер для `<funding>`.

Отличается от `<fundings>` тем, что относится именно к финансированию конкретной статьи, а не к общему финансированию.

---

#### 3.2.16 `<secTitle>` — название секции для статьи (необязательный, 0..1)

Привязка статьи к секции. Используется как альтернатива вложению `<article>` внутрь `<section>`.

| Атрибут | Тип | Обязательность | Описание |
|---------|-----|----------------|----------|
| `lang` | `string` | нет | Код языка |

**Пример:**
```xml
<secTitle lang="RUS">Математический анализ</secTitle>
```

---

## 4. Полный пример XML

```xml
<?xml version="1.0" encoding="utf-16" standalone="no"?>
<journal>
  <operCard>
    <date>2026-05-12</date>
    <cntArticle>2</cntArticle>
    <cs>1</cs>
    <operator>Автогенерация</operator>
  </operCard>

  <titleid>11982</titleid>
  <issn>1816-9791</issn>
  <eissn>2541-9005</eissn>
  <codeNEB>12345</codeNEB>

  <journalInfo lang="RUS">
    <title>Известия Саратовского университета. Новая серия. Серия: Математика. Механика. Информатика</title>
    <abbrTitle>Изв. Сарат. ун-та. Нов. сер. Сер. Математика. Механика. Информатика</abbrTitle>
    <publ>Издательство Саратовского университета</publ>
    <placePubl>Саратов</placePubl>
    <address>410012, Саратов, ул. Астраханская, 83</address>
  </journalInfo>
  <journalInfo lang="ENG">
    <title>Izvestiya of Saratov University. Mathematics. Mechanics. Informatics</title>
    <abbrTitle>Izv. Saratov Univ. Math. Mech. Inform.</abbrTitle>
    <publ>Saratov University Press</publ>
    <placePubl>Saratov</placePubl>
  </journalInfo>

  <issue>
    <volume>6</volume>
    <number>1</number>
    <dateUni>2006</dateUni>
    <part/>
    <pages>1-120</pages>

    <issTitle lang="RUS">Известия Саратовского университета. Новая серия. Серия «Математика. Механика. Информатика» 2006, Т. 6, вып. 1</issTitle>
    <issTitle lang="ENG">Izvestiya of Saratov University. New Series. Series: Mathematics. Mechanics. Informatics 2006, vol. 6, iss. 1</issTitle>

    <codes>
      <doi>10.18500/1816-9791-2006-6-1</doi>
      <edn>ABCDEF</edn>
    </codes>

    <files>
      <file desc="fullText" fullText="yes">issue_2006_6_1.pdf</file>
    </files>

    <articles>
      <section>
        <secTitle lang="RUS">Математический анализ</secTitle>
        <secTitle lang="ENG">Mathematical Analysis</secTitle>
      </section>

      <article>
        <pages>12-20</pages>
        <artType>JA</artType>

        <codes>
          <doi>10.18500/1816-9791-2006-6-1-12-20</doi>
          <edn>HJKLMN</edn>
          <udk>517.9</udk>
          <msc>35K05</msc>
        </codes>

        <authors>
          <author num="1">
            <individInfo lang="RUS">
              <surname>Иванов</surname>
              <initials>И.И.</initials>
              <orgName>Саратовский национальный исследовательский государственный университет</orgName>
              <address>410012, Саратов, ул. Астраханская, 83</address>
              <email>ivanov@example.com</email>
            </individInfo>
            <individInfo lang="ENG">
              <surname>Ivanov</surname>
              <initials>I.I.</initials>
              <orgName>Saratov State University</orgName>
              <address>83 Astrakhanskaya St., Saratov, 410012, Russia</address>
              <email>ivanov@example.com</email>
            </individInfo>
            <authorCodes>
              <scopusid>571927xxx</scopusid>
              <orcid>0000-0001-2345-6789</orcid>
              <spin>1234-5678</spin>
              <researcherid>A-1234-2015</researcherid>
            </authorCodes>
          </author>
        </authors>

        <artTitles>
          <artTitle lang="RUS">Предельное распределение ранга дружбы в сложных сетях</artTitle>
          <artTitle lang="ENG">Limiting distribution of friendship rank in complex networks</artTitle>
        </artTitles>

        <abstracts>
          <abstract lang="RUS">В работе изучается предельное распределение ранга дружбы в сложных сетях.</abstract>
          <abstract lang="ENG">In this paper we study the limiting distribution of friendship rank in complex networks.</abstract>
        </abstracts>

        <text lang="ANY">Полный текст статьи...</text>

        <keywords>
          <kwdGroup lang="RUS">
            <keyword>сложные сети</keyword>
            <keyword>ранг дружбы</keyword>
          </kwdGroup>
          <kwdGroup lang="ENG">
            <keyword>complex networks</keyword>
            <keyword>friendship rank</keyword>
          </kwdGroup>
        </keywords>

        <dates>
          <dateReceived>2025-09-15</dateReceived>
          <dateAccepted>2026-01-20</dateAccepted>
          <datePublication>2006-06-01</datePublication>
        </dates>

        <references>
          <reference>
            <refInfo lang="ANY">
              <text>Petrov P.P. Some results // Math. J. 2024. Vol. 5. P. 10-15.</text>
            </refInfo>
          </reference>
        </references>

        <files>
          <file desc="fullText">article_7430.pdf</file>
        </files>

        <fundings>
          <funding lang="ANY">РФФИ, проект № 24-01-00015</funding>
        </fundings>

        <secTitle lang="RUS">Математический анализ</secTitle>
      </article>
    </articles>
  </issue>
</journal>
```

---

## 5. Сводная таблица кратности элементов

### `<journal>` (корень)

| Элемент | Кратность | Описание |
|---------|-----------|----------|
| `operCard` | 0..1 | Карточка оператора |
| `titleid` | 0..1 | ID журнала в РИНЦ |
| `issn` | 0..1 | ISSN печатный |
| `eissn` | 0..1 | ISSN электронный |
| `codeNEB` | 0..1 | Код НЭБ |
| `journalInfo` | 0..unbounded | Информация о журнале (повторяется для каждого языка) |
| `issue` | 0..1 | Выпуск журнала |

### `<issue>`

| Элемент | Кратность | Описание |
|---------|-----------|----------|
| `volume` | 0..1 | Том |
| `number` | 0..1 | Номер |
| `altNumber` | 0..1 | Альтернативный номер |
| `dateUni` | 0..1 | Год/дата |
| `part` | 0..1 | Часть |
| `pages` | 0..1 | Страницы |
| `issTitle` | 0..1 | Название выпуска |
| `codes` | 0..1 | DOI/EDN выпуска |
| `files` | 0..1 | Файлы выпуска |
| `articles` | 1 | Контейнер статей (**обязательный**) |

### `<article>`

| Элемент | Кратность | Описание |
|---------|-----------|----------|
| `langPubl` | 0..1 | Язык публикации |
| `pages` | 0..1 | Страницы |
| `artType` | 0..1 | Тип статьи |
| `codes` | 0..1 | Коды/классификаторы |
| `authors` | 0..1 | Авторы |
| `artTitles` | 0..1 | Заголовки |
| `abstracts` | 0..1 | Аннотации |
| `text` | 0..1 | Полный текст |
| `keywords` | 0..1 | Ключевые слова |
| `rubrics` | 0..1 | Рубрики |
| `dates` | 0..1 | Даты |
| `references` | 0..1 | Литература |
| `files` | 0..1 | Файлы |
| `fundings` | 0..1 | Финансирование |
| `artFunding` | 0..1 | Финансирование статьи |
| `secTitle` | 0..1 | Принадлежность к секции |

### `<author>` — атрибуты и элементы

| Элемент/атрибут | Кратность | Описание |
|-----------------|-----------|----------|
| `@num` | 0..1 | Порядковый номер |
| `@id` | 0..1 | Идентификатор |
| `role` | 0..1 | Роль |
| `correspondent` | 0..1 | Соответствующий автор |
| `individInfo` | 1..3 | Персональная информация (на каждом языке) |
| `authorCodes` | 0..1 | Идентификаторы автора |
| `country` | 0..1 | Страна |

### `<codes>` внутри `<article>`

| Элемент | Кратность | Описание |
|---------|-----------|----------|
| `doi` | 0..1 | DOI |
| `edn` | 0..1 | EDN |
| `udk` | 0..unbounded | УДК |
| `bbk` | 0..unbounded | ББК |
| `vak` | 0..1 | ВАК |
| `vak21` | 0..1 | ВАК (новый) |
| `jel` | 0..unbounded | JEL |
| `msc` | 0..unbounded | MSC |
| `pacs` | 0..unbounded | PACS |
| `anycode` | 0..unbounded | Другой код |

---

## 6. Форматирование в mixed content

Ряд элементов (заголовки, аннотации, фамилии, библиографические ссылки) поддерживают mixed content — HTML-подобную разметку внутри текста:

| Тег | Описание |
|-----|----------|
| `i` / `I` | Курсив |
| `b` / `B` | Полужирный |
| `sup` / `SUP` | Верхний индекс (x²) |
| `sub` / `SUB` | Нижний индекс (H₂O) |
| `br` / `BR` | Перенос строки |
| `tex` / `TEX` | TeX-формула |

Теги могут быть вложены друг в друга произвольным образом.

**Пример:**
```xml
<artTitle lang="RUS">О распределении <sub>n</sub>-мерных <i>случайных</i> величин</artTitle>
```

---

## 7. Коды языков

В схеме используются следующие стандартные значения атрибута `lang`:

| Код | Описание |
|-----|----------|
| `RUS` | Русский |
| `ENG` | Английский |
| `ANY` | Язык не указан / любой |
| `TAT` | Татарский |
| `KAZ` | Казахский |

---

## 8. Отличия от РИНЦ-формата

Формат «Метафора» (journal3) является расширенной версией формата РИНЦ и добавляет:

1. **`operCard`** — служебная информация об операторе
2. **`codeNEB`** — код НЭБ
3. **`altNumber`** — альтернативный номер выпуска
4. **`issTitle`** — название выпуска
5. **`codes` на уровне выпуска** — DOI/EDN для всего выпуска
6. **`files` на уровне выпуска** — обложка и другие файлы выпуска
7. **`rubrics`** — рубрики внутри статьи
8. **`vak` / `vak21`** — коды ВАК
9. **`jel` / `msc` / `pacs` / `anycode`** — дополнительные классификаторы
10. **`role` / `correspondent`** у автора — роль и признак corresponding author
11. **`bio` / `town` / `country` / `otherInfo` / `comment` / `commentDate`** в `individInfo` — расширенная информация об авторе
12. **`notAuthentic` атрибут** для `orgName` и `email` — признак недостоверности
13. **`elements` внутри `refInfo`** — структурированный разбор библиографической ссылки
14. **`tex` / `TEX` теги форматирования** — TeX-формулы в тексте
15. **`furl`** — файлы по URL (вместе с `<file>` для локальных файлов)
16. **`fundings` / `artFunding`** — информация о финансировании
17. **`secTitle` внутри `<article>`** — альтернативный способ привязки к секции
