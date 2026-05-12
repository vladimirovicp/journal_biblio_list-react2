# Документация XML-формата РИНЦ (elibrary.ru)

**Источник:** `doc/xsd/journal образец из РИНЦ.xsd`

---

## Общая структура

Корневой элемент `<journal>` содержит метаданные журнала и информацию о выпуске со статьями. На верхнем уровне используется модель `all` — порядок элементов не фиксирован, но каждый элемент встречается не более одного раза.

```xml
<?xml version="1.0" encoding="utf-8"?>
<journal>
  <titleid>...</titleid>
  <issn>...</issn>
  <eissn>...</eissn>
  <journalInfo lang="...">...</journalInfo>
  <issue type="...">
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

### 1.1 `<titleid>` — идентификатор журнала в РИНЦ (**обязательный**)

Уникальный идентификатор журнала в системе elibrary. Служит для определения журнала в БД.

| Поле | Тип | Обязательность | Описание |
|------|-----|----------------|----------|
| текстовое содержимое | `unsignedInt` | **да** | Числовой идентификатор журнала |

**Пример:**
```xml
<titleid>11982</titleid>
```

---

### 1.2 `<issn>` — ISSN печатной версии (необязательный)

| Поле | Тип | Обязательность | Описание |
|------|-----|----------------|----------|
| текстовое содержимое | `string` | нет | ISSN печатного издания |

**Пример:**
```xml
<issn>1816-9791</issn>
```

---

### 1.3 `<eissn>` — ISSN электронной версии (необязательный)

| Поле | Тип | Обязательность | Описание |
|------|-----|----------------|----------|
| текстовое содержимое | `string` | нет | ISSN электронного издания |

**Пример:**
```xml
<eissn>2541-9005</eissn>
```

---

### 1.4 `<journalInfo>` — информация о журнале (**обязательный**)

Содержит название журнала. Может включать атрибут языка.

**Атрибуты:**

| Атрибут | Тип | Обязательность | Описание |
|---------|-----|----------------|----------|
| `lang` | `typeLang` | нет | Код языка названия журнала |

**Дочерние элементы:**

| Поле | Тип | Обязательность | Описание |
|------|-----|----------------|----------|
| `title` | `string` | **да** | Название журнала |

**Пример:**
```xml
<journalInfo lang="RUS">
  <title>Известия Саратовского университета. Новая серия. Серия: Математика. Механика. Информатика</title>
</journalInfo>
<journalInfo lang="ENG">
  <title>Izvestiya of Saratov University. Mathematics. Mechanics. Informatics</title>
</journalInfo>
```

---

## 2. `<issue>` — информация о выпуске (**обязательный**)

Содержит метаданные конкретного выпуска журнала и все статьи. В XML используется один раз.

**Атрибуты:**

| Атрибут | Тип | Обязательность | Описание |
|---------|-----|----------------|----------|
| `type` | `typeIssueType` | нет | Тип выпуска (см. [справочник типов выпусков](#81-справочник-typeissuetype)) |

### 2.1 Основные поля выпуска

| Поле | Тип | Обязательность | Описание |
|------|-----|----------------|----------|
| `volume` | `unsignedInt` | нет | Том (число). Обязательно наличие тома или номера. |
| `number` | `string` | нет | Номер выпуска. Обязательно наличие тома или номера. |
| `altNumber` | `string` | нет | Сквозной номер выпуска |
| `dateUni` | `unsignedShort` | **да** | Год издания выпуска |
| `part` | `unsignedShort` | нет | Часть выпуска (число) |
| `pages` | `string` | нет | Диапазон страниц выпуска. Формат: `начало-конец`. Допускается через запятую, например: `7-8, 27` |

**Пример:**
```xml
<volume>6</volume>
<number>1</number>
<dateUni>2006</dateUni>
<pages>1-120</pages>
```

---

### 2.2 `<issTitle>` — название/тема выпуска (необязательный)

| Атрибут | Тип | Обязательность | Описание |
|---------|-----|----------------|----------|
| `lang` | `typeLang` | нет | Код языка |

Текстовое содержимое — название или тема выпуска.

**Пример:**
```xml
<issTitle lang="RUS">Специальный выпуск</issTitle>
```

---

### 2.3 `<codes>` — коды выпуска (необязательный)

| Поле | Тип | Кратность | Описание |
|------|-----|-----------|----------|
| `doi` | `string` | 0..1 | DOI выпуска |
| `edn` | `string` | 0..1 | EDN — eLIBRARY Document Number (6 латинских символов) |

**Пример:**
```xml
<codes>
  <doi>10.18500/1816-9791-2006-6-1</doi>
  <edn>ABCDEF</edn>
</codes>
```

---

### 2.4 `<files>` — файлы выпуска (необязательный)

Содержит элементы `<file>` — файлы, прикреплённые к выпуску.

**`<file>`:**

| Атрибут | Тип | Обязательность | Описание |
|---------|-----|----------------|----------|
| `desc` | `typeIssueDesc` | **да** | Тип файла. Допустимое значение: `cover` — обложка (JPEG, JPG, PNG, GIF) |

Текстовое содержимое — имя файла.

**Пример:**
```xml
<files>
  <file desc="cover">cover_2006_6_1.jpg</file>
</files>
```

---

## 3. `<articles>` — статьи выпуска (**обязательный**)

Контейнер для секций и статей. В XML используется один раз. Содержит в произвольном порядке:

- `<section>` — секция/рубрика выпуска
- `<article>` — статья

---

### 3.1 `<section>` — секция выпуска (необязательный, повторяющийся)

Названия раздела на разных языках. Вставляется перед первой статьёй, принадлежащей этому разделу.

| Поле | Тип | Кратность | Описание |
|------|-----|-----------|----------|
| `secTitle` | mixed | 1..unbounded | Название раздела |

**`<secTitle>`:**

| Атрибут | Тип | Обязательность | Описание |
|---------|-----|----------------|----------|
| `lang` | `typeLang` | **да** | Код языка |

Внутри допустимы элементы форматирования: `i`, `b`, `sub`, `sup`, `br`.

**Пример:**
```xml
<section>
  <secTitle lang="RUS">Математический анализ</secTitle>
  <secTitle lang="ENG">Mathematical Analysis</secTitle>
</section>
```

---

### 3.2 `<article>` — статья (**обязательный**, повторяющийся)

Основной элемент, описывающий отдельную статью. Порядок элементов внутри `<article>` должен соответствовать XSD-схеме. Если какого-то элемента нет — его можно пропустить.

---

#### 3.2.1 `<pages>` — страницы (**обязательный**)

| Поле | Тип | Обязательность | Описание |
|------|-----|----------------|----------|
| текстовое содержимое | `string` | **да** | Диапазон страниц. Форматы: `7-8`, `7-8, 27`, или буквенные обозначения |

---

#### 3.2.2 `<artType>` — тип статьи (**обязательный**)

| Поле | Тип | Обязательность | Описание |
|------|-----|----------------|----------|
| текстовое содержимое | `typeArticleType` | **да** | Тип статьи — трёхбуквенный код (см. [справочник типов статей](#82-справочник-typearticletype)) |

**Пример:**
```xml
<artType>RAR</artType>
```

---

#### 3.2.3 `<langPubl>` — язык публикации (необязательный)

| Поле | Тип | Обязательность | Описание |
|------|-----|----------------|----------|
| текстовое содержимое | `typeLang` | нет | Код языка статьи (см. [справочник языков](#83-справочник-typelang)) |

---

#### 3.2.4 `<authors>` — авторы статьи (необязательный)

Контейнер для элементов `<author>`. Содержит всех авторов, в том числе рецензентов, редакторов и т.д.

**`<author>`:**

| Атрибут | Тип | Обязательность | Описание |
|---------|-----|----------------|----------|
| `num` | `unsignedInt` | **да** | Порядковый номер автора в статье |
| `id` | `typeIntegerOrEmpty` | нет | Идентификатор автора в elibrary (устаревшее, не загружается в БД) |

**Дочерние элементы `<author>`:**

##### `<role>` — роль автора (необязательный)

| Поле | Тип | Описание |
|------|-----|----------|
| текстовое содержимое | `typeRole` | Числовой идентификатор роли (см. [справочник ролей](#84-справочник-typerole)). Если элемент отсутствует — автор. |

##### `<correspondent>` — автор-корреспондент (необязательный)

| Поле | Тип | Описание |
|------|-----|----------|
| текстовое содержимое | `typeCorrespondent` | Признак corresponding author (см. [справочник](#85-справочник-typecorrespondent)) |

##### `<authorCodes>` — идентификаторы автора (необязательный)

| Поле | Тип | Описание |
|------|-----|----------|
| `researcherid` | `string` | ResearcherID (Web of Science) |
| `spin` | `string` | SPIN-код РИНЦ. Формат: `XXXX-XXXX`, где X — число |
| `scopusid` | `string` | Scopus Author ID |
| `orcid` | `string` | ORCID |

##### `<individInfo>` — персональная информация (**обязательный**, 1..3)

Информация об авторе на конкретном языке. Минимум 1, максимум 3 экземпляра.

| Атрибут | Тип | Обязательность | Описание |
|---------|-----|----------------|----------|
| `lang` | `typeLang` | **да** | Код языка сведений об авторе |

**Дочерние элементы `<individInfo>`:**

| Поле | Тип | Кратность | Описание |
|------|-----|-----------|----------|
| `surname` | mixed | 1 | Фамилия автора (**обязательное**) |
| `initials` | mixed | 0..1 | Инициалы автора |
| `address` | mixed | 0..1 | Адрес организации. Несколько адресов — через точку с запятой. Текстовое поле, теги удаляются. |
| `town` | mixed | 0..1 | Город организации. Несколько — через точку с запятой. Текстовое поле. |
| `country` | mixed | 0..1 | Страна организации. Несколько — через точку с запятой. Текстовое поле. |
| `otherInfo` | mixed | 0..1 | Другие сведения об авторе |
| `comment` | mixed | 0..1 | Текст рецензии (загружается если `role` = «рецензент»). Допустимы: `i`, `b`, `sub`, `sup`, `br` |
| `commentDate` | `string` | 0..1 | Дата рецензии, формат: `дд.мм.гггг` |
| `orgName` | mixed | 0..1 | Название организации. Несколько — через точку с запятой. Атрибут `notAuthentic` (unsignedByte). |
| `email` | mixed | 0..1 | Email автора. Атрибут `notAuthentic` (unsignedByte). |

**Атрибут `notAuthentic`** (для `orgName` и `email`):

| Тип | Описание |
|-----|----------|
| `unsignedByte` | Признак недостоверности данных организации/email |

**Пример:**
```xml
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
```

---

#### 3.2.5 `<artTitles>` — заголовки статьи (**обязательный**, 1..3)

Контейнер для элементов `<artTitle>`. Обязателен для использования.

| Элемент | Кратность | Описание |
|---------|-----------|----------|
| `artTitle` | 1..unbounded | Заголовок статьи на языке |

**`<artTitle>`:**

| Атрибут | Тип | Обязательность | Описание |
|---------|-----|----------------|----------|
| `lang` | `typeLang` | **да** | Код языка |

Внутри допустимы элементы форматирования: `i`, `b`, `sub`, `sup`, `br`.

**Пример:**
```xml
<artTitles>
  <artTitle lang="RUS">Предельное распределение ранга дружбы в сложных сетях</artTitle>
  <artTitle lang="ENG">Limiting distribution of friendship rank in complex networks</artTitle>
</artTitles>
```

---

#### 3.2.6 `<abstracts>` — аннотации (необязательный)

Контейнер для элементов `<abstract>`.

| Элемент | Кратность | Описание |
|---------|-----------|----------|
| `abstract` | 0..unbounded | Аннотация на языке |

**`<abstract>`:**

| Атрибут | Тип | Обязательность | Описание |
|---------|-----|----------------|----------|
| `lang` | `typeLang` | **да** | Код языка |

Внутри допустимы: `i`, `b`, `sub`, `sup`, `br`.

**Пример:**
```xml
<abstracts>
  <abstract lang="RUS">В работе изучается предельное распределение...</abstract>
  <abstract lang="ENG">In this paper we study the limiting distribution...</abstract>
</abstracts>
```

---

#### 3.2.7 `<text>` — полный текст (**обязательный**, 1..unbounded)

Неформатированный текст публикации.

| Атрибут | Тип | Обязательность | Описание |
|---------|-----|----------------|----------|
| `lang` | `typeLang` | нет | Код языка текста |

**Пример:**
```xml
<text lang="RUS">Полный текст статьи...</text>
```

---

#### 3.2.8 `<codes>` — коды и классификаторы статьи (необязательный)

| Поле | Тип | Кратность | Описание |
|------|-----|-----------|----------|
| `doi` | `string` | 0..1 | DOI |
| `edn` | `string` | 0..1 | EDN — eLIBRARY Document Number (6 латинских символов) |
| `udk` | `string` | 0..unbounded | УДК |
| `bbk` | `string` | 0..unbounded | ББК |
| `vak` | `string` | 0..1 | Код ВАК (старая номенклатура). Только шифр специальности, например: `5.9.5.` |
| `vak21` | `string` | 0..1 | Код ВАК (новая номенклатура 2021 г.). Только шифр, например: `5.9.5.` |
| `jel` | `string` | 0..unbounded | JEL (Journal of Economic Literature) |
| `msc` | `string` | 0..unbounded | MSC (Mathematics Subject Classification) |
| `pacs` | `string` | 0..unbounded | PACS (Physics and Astronomy Classification Scheme) |
| `anycode` | `string` | 0..unbounded | Другие коды. **Внимание:** не относится к рубрикам ГРНТИ (для них есть контейнер `rubrics`). |

**Пример:**
```xml
<codes>
  <doi>10.18500/1816-9791-2006-6-1-12-20</doi>
  <edn>HJKLMN</edn>
  <udk>517.9</udk>
  <msc>35K05</msc>
  <vak>5.9.5.</vak>
</codes>
```

---

#### 3.2.9 `<keywords>` — ключевые слова (необязательный)

Контейнер для групп ключевых слов.

| Элемент | Кратность | Описание |
|---------|-----------|----------|
| `kwdGroup` | 1..unbounded | Группа ключевых слов на одном языке |

**`<kwdGroup>`:**

| Атрибут | Тип | Обязательность | Описание |
|---------|-----|----------------|----------|
| `lang` | `typeLang` | **да** | Код языка группы. **Нельзя** указывать `ANY` или `UNK`. |

**Дочерние элементы `<kwdGroup>`:**

| Элемент | Кратность | Описание |
|---------|-----------|----------|
| `keyword` | 1..unbounded | Ключевое слово (mixed content). Допустимы: `i`, `b`, `sub`, `sup` |

**Пример:**
```xml
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
```

---

#### 3.2.10 `<references>` — список литературы (необязательный)

Контейнер для ссылок на литературу.

| Элемент | Кратность | Описание |
|---------|-----------|----------|
| `reference` | 1..unbounded | Библиографическая ссылка |

**`<reference>`:**

| Элемент | Кратность | Описание |
|---------|-----------|----------|
| `refInfo` | 0..unbounded | Информация о ссылке на языке |

**`<refInfo>`:**

| Атрибут | Тип | Обязательность | Описание |
|---------|-----|----------------|----------|
| `lang` | `typeLang` | **да** | Код языка ссылки |

**Дочерние элементы `<refInfo>`:**

| Элемент | Кратность | Описание |
|---------|-----------|----------|
| `text` | 1 | Полный текст ссылки (**обязательный**). Mixed content. Допустимы: `i`, `b`, `sub`, `sup`, `br` |
| `elements` | 0..1 | Структурированные элементы ссылки |

**`<elements>` → `<element>`:**

Структурированный разбор библиографической ссылки. Каждый `<element>` имеет:

| Атрибут | Тип | Обязательность | Описание |
|---------|-----|----------------|----------|
| `field` | `typeElement` | **да** | Название поля (см. [справочник typeElement](#86-справочник-typeelement)) |

Содержимое `<element>` — mixed content, может включать форматирование:

| Тег | Описание |
|-----|----------|
| `i` / `I` | Курсив |
| `b` / `B` | Полужирный |
| `sup` / `SUP` | Верхний индекс |
| `sub` / `SUB` | Нижний индекс |
| `br` / `BR` | Перенос строки |
| `tex` / `TEX` | TeX-формула |

**Пример:**
```xml
<references>
  <reference>
    <refInfo lang="ANY">
      <text>Ivanov I.I. On some problem // Math. J. 2025. Vol. 10. P. 15-20.</text>
      <elements>
        <element field="Authors">Ivanov I.I.</element>
        <element field="Name">On some problem</element>
        <element field="Title">Math. J.</element>
        <element field="YearPubl">2025</element>
        <element field="Volume">10</element>
        <element field="Pages">15-20</element>
      </elements>
    </refInfo>
  </reference>
</references>
```

---

#### 3.2.11 `<files>` — файлы статьи (необязательный)

Файлы, прикреплённые к статье. Содержит `<file>` и/или `<furl>`.

**`<file>` — локальный файл (0..unbounded):**

| Атрибут | Тип | Обязательность | Описание |
|---------|-----|----------------|----------|
| `desc` | `typeFileDesc` | нет | Тип файла (см. [справочник typeFileDesc](#87-справочник-typefiledesc)) |
| `lang` | `typeLang` | нет | Код языка файла |

Текстовое содержимое — имя файла.

**`<furl>` — файл по URL (0..unbounded):**

| Атрибут | Тип | Обязательность | Описание |
|---------|-----|----------------|----------|
| `lang` | `typeLang` | нет | Код языка |
| `desc` | `typeUrlDesc` | нет | Тип ссылки (см. [справочник typeUrlDesc](#88-справочник-typeurldesc)) |
| `location` | `string` | нет | **Устаревший**, не используется. Место размещения PDF. |
| `version` | `string` | нет | **Устаревший**, не используется. Версия PDF. |

Текстовое содержимое — URL файла.

**Пример:**
```xml
<files>
  <file desc="fullText">article_12345.pdf</file>
  <furl desc="fullText" lang="ANY">https://example.com/articles/12345.pdf</furl>
</files>
```

---

#### 3.2.12 `<rubrics>` — рубрики ГРНТИ (необязательный)

Контейнер для рубрик статьи (коды ГРНТИ).

| Элемент | Кратность | Описание |
|---------|-----------|----------|
| `rubric` | 1..unbounded | Код рубрики ГРНТИ (`string`) |

**Пример:**
```xml
<rubrics>
  <rubric>27.21.15</rubric>
  <rubric>27.41.19</rubric>
</rubrics>
```

---

#### 3.2.13 `<dates>` — даты (необязательный)

Содержит ключевые даты жизненного цикла статьи. Все даты в формате `дд.мм.гггг`.

| Поле | Тип | Кратность | Описание |
|------|-----|-----------|----------|
| `dateReceived` | `string` | 0..1 | Дата поступления в редакцию |
| `dateAccepted` | `string` | 0..1 | Дата принятия в печать |
| `datePublication` | `string` | 0..1 | Дата публикации |

**Пример:**
```xml
<dates>
  <dateReceived>15.09.2025</dateReceived>
  <dateAccepted>20.01.2026</dateAccepted>
  <datePublication>01.03.2026</datePublication>
</dates>
```

---

#### 3.2.14 `<fundings>` — источники финансирования (необязательный)

Контейнер для элементов `<funding>`.

| Элемент | Кратность | Описание |
|---------|-----------|----------|
| `funding` | 0..unbounded | Источник финансирования |

**`<funding>`:**

| Атрибут | Тип | Обязательность | Описание |
|---------|-----|----------------|----------|
| `lang` | `typeLang` | **да** | Код языка описания финансирования |

Mixed content. Допустимы: `i`, `b`, `sub`, `sup`, `br`.

**Пример:**
```xml
<fundings>
  <funding lang="RUS">РФФИ, проект № 24-01-00015</funding>
  <funding lang="ENG">RFBR, project No. 24-01-00015</funding>
</fundings>
```

---

## 4. Полный пример XML

```xml
<?xml version="1.0" encoding="utf-8"?>
<journal>
  <titleid>11982</titleid>
  <issn>1816-9791</issn>
  <eissn>2541-9005</eissn>

  <journalInfo lang="RUS">
    <title>Известия Саратовского университета. Новая серия. Серия: Математика. Механика. Информатика</title>
  </journalInfo>
  <journalInfo lang="ENG">
    <title>Izvestiya of Saratov University. Mathematics. Mechanics. Informatics</title>
  </journalInfo>

  <issue type="ISS">
    <volume>6</volume>
    <number>1</number>
    <dateUni>2006</dateUni>
    <pages>1-120</pages>

    <issTitle lang="RUS">Известия Саратовского университета. Новая серия. Серия «Математика. Механика. Информатика» 2006, Т. 6, вып. 1</issTitle>

    <codes>
      <doi>10.18500/1816-9791-2006-6-1</doi>
      <edn>ABCDEF</edn>
    </codes>

    <files>
      <file desc="cover">cover_2006_6_1.jpg</file>
    </files>

    <articles>
      <section>
        <secTitle lang="RUS">Математический анализ</secTitle>
        <secTitle lang="ENG">Mathematical Analysis</secTitle>
      </section>

      <article>
        <pages>12-20</pages>
        <artType>RAR</artType>
        <langPubl>RUS</langPubl>

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

        <text lang="RUS">Полный текст статьи...</text>

        <codes>
          <doi>10.18500/1816-9791-2006-6-1-12-20</doi>
          <edn>HJKLMN</edn>
          <udk>517.9</udk>
          <msc>35K05</msc>
        </codes>

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
          <dateReceived>15.09.2025</dateReceived>
          <dateAccepted>20.01.2026</dateAccepted>
          <datePublication>01.06.2006</datePublication>
        </dates>

        <references>
          <reference>
            <refInfo lang="ANY">
              <text>Petrov P.P. Some results // Math. J. 2024. Vol. 5. P. 10-15.</text>
              <elements>
                <element field="Authors">Petrov P.P.</element>
                <element field="Name">Some results</element>
                <element field="Title">Math. J.</element>
                <element field="YearPubl">2024</element>
                <element field="Volume">5</element>
                <element field="Pages">10-15</element>
              </elements>
            </refInfo>
          </reference>
        </references>

        <files>
          <file desc="fullText">article_7430.pdf</file>
        </files>

        <rubrics>
          <rubric>27.21.15</rubric>
        </rubrics>

        <fundings>
          <funding lang="RUS">РФФИ, проект № 24-01-00015</funding>
          <funding lang="ENG">RFBR, project No. 24-01-00015</funding>
        </fundings>
      </article>
    </articles>
  </issue>
</journal>
```

---

## 5. Сводная таблица кратности элементов

### `<journal>` (корень)

| Элемент | Кратность | Обязательный | Описание |
|---------|-----------|--------------|----------|
| `titleid` | 1 | **да** | ID журнала в РИНЦ (число) |
| `issn` | 0..1 | нет | ISSN печатный |
| `eissn` | 0..1 | нет | ISSN электронный |
| `journalInfo` | 1..unbounded | **да** | Название журнала (для каждого языка) |
| `issue` | 1 | **да** | Выпуск журнала |

### `<issue>`

| Элемент | Кратность | Обязательный | Описание |
|---------|-----------|--------------|----------|
| `volume` | 0..1 | нет* | Том (число). *Обязателен том или номер. |
| `number` | 0..1 | нет* | Номер. *Обязателен том или номер. |
| `altNumber` | 0..1 | нет | Сквозной номер |
| `dateUni` | 1 | **да** | Год издания (число) |
| `part` | 0..1 | нет | Часть (число) |
| `pages` | 0..1 | нет | Страницы выпуска |
| `issTitle` | 0..1 | нет | Название/тема выпуска |
| `codes` | 0..1 | нет | DOI/EDN выпуска |
| `articles` | 1 | **да** | Контейнер статей |
| `files` | 0..1 | нет | Файлы выпуска (обложка) |

### `<article>`

| Элемент | Кратность | Обязательный | Описание |
|---------|-----------|--------------|----------|
| `pages` | 1 | **да** | Страницы |
| `artType` | 1 | **да** | Тип статьи |
| `langPubl` | 0..1 | нет | Язык публикации |
| `authors` | 0..1 | нет | Авторы |
| `artTitles` | 1..3 | **да** | Заголовки |
| `abstracts` | 0..1 | нет | Аннотации |
| `text` | 1..unbounded | **да** | Полный текст |
| `codes` | 0..1 | нет | Коды/классификаторы |
| `keywords` | 0..1 | нет | Ключевые слова |
| `references` | 0..1 | нет | Литература |
| `files` | 0..1 | нет | Файлы |
| `rubrics` | 0..1 | нет | Рубрики ГРНТИ |
| `dates` | 0..1 | нет | Даты |
| `fundings` | 0..1 | нет | Финансирование |

### `<author>` — атрибуты и элементы

| Элемент/атрибут | Кратность | Обязательный | Описание |
|-----------------|-----------|--------------|----------|
| `@num` | 1 | **да** | Порядковый номер |
| `@id` | 0..1 | нет | ID автора (устаревшее) |
| `role` | 0..1 | нет | Роль (число) |
| `correspondent` | 0..1 | нет | Автор-корреспондент |
| `individInfo` | 1..3 | **да** | Персональная информация |
| `authorCodes` | 0..1 | нет | Идентификаторы автора |

### `<codes>` внутри `<article>`

| Элемент | Кратность | Описание |
|---------|-----------|----------|
| `doi` | 0..1 | DOI |
| `edn` | 0..1 | EDN (6 латинских символов) |
| `udk` | 0..unbounded | УДК |
| `bbk` | 0..unbounded | ББК |
| `vak` | 0..1 | ВАК (старая номенклатура) |
| `vak21` | 0..1 | ВАК (номенклатура 2021 г.) |
| `jel` | 0..unbounded | JEL |
| `msc` | 0..unbounded | MSC |
| `pacs` | 0..unbounded | PACS |
| `anycode` | 0..unbounded | Другие коды (не ГРНТИ!) |

---

## 6. Форматирование в mixed content

Ряд элементов (заголовки, аннотации, фамилии, библиографические ссылки, ключевые слова, финансирование) поддерживают mixed content — HTML-подобную разметку внутри текста:

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

## 7. Различия между форматами РИНЦ и Метафора

| Признак | РИНЦ | Метафора (journal3) |
|---------|------|---------------------|
| `titleid` | **обязательный**, `unsignedInt` | необязательный, `string` |
| `journalInfo` | только `title` | `title`, `Title`, `abbrTitle`, `publ`, `placePubl`, `address` |
| `issue` атрибут `type` | есть (`ISS`/`OFI`/`SPI`) | нет |
| `operCard` | нет | есть |
| `codeNEB` | нет | есть |
| `artFunding` | нет | есть |
| `secTitle` внутри `<article>` | нет | есть (привязка к секции) |
| `artType` | по справочнику `typeArticleType` | `string` |
| `dateUni` | `unsignedShort` (только год) | `string` |
| `text` | **обязательный** (1..unbounded) | необязательный (0..1) |
| `pages` в статье | **обязательный** | необязательный |
| `artTitles` | **обязательный** (1..3) | необязательный |
| `kwdGroup/@lang` | **обязательный**, нельзя `ANY`/`UNK` | необязательный |
| `secTitle/@lang` | **обязательный** | необязательный |
| `funding/@lang` | **обязательный** | необязательный |
| `notAuthentic` тип | `unsignedByte` | `string` |
| Даты формат | `дд.мм.гггг` | не регламентирован |
| `typeIssueDesc` | только `cover` | произвольная строка |

---

## 8. Справочники (энумерации XSD)

### 8.1 Справочник `typeIssueType` — типы выпусков

| Код | Описание |
|-----|----------|
| `ISS` | Выпуск журнала |
| `OFI` | Выпуск Online First |
| `SPI` | Спец. выпуск |

---

### 8.2 Справочник `typeArticleType` — типы статей

| Код | Русский | English |
|-----|---------|---------|
| `ABS` | Аннотация | Abstract |
| `BRV` | Рецензия | Review |
| `CNF` | Материалы конференции / Тезисы доклада | Conference Report / Theses |
| `COR` | Переписка | Correspondence |
| `EDI` | Редакторская заметка | Editorial |
| `MIS` | Разное | Miscellaneous |
| `PER` | Персоналия | Personal |
| `RAR` | Научная статья | Research Article |
| `REP` | Научный отчёт | Scientific Report |
| `REV` | Обзорная статья | Review Article |
| `RPR` | Репринт | Reprint |
| `SCO` | Краткое сообщение | Short Communication |
| `UNK` | Не определён (**устаревший**) | Unknown |

---

### 8.3 Справочник `typeLang` — коды языков

Трёхбуквенные коды по стандарту ISO 639. Наиболее употребимые:

| Код | Язык |
|-----|------|
| `RUS` | Русский |
| `ENG` | Английский |
| `ANY` | Не определён (любой) |
| `UNK` | Не определён (любой) |
| `DEU` | Немецкий |
| `FRE` | Французский |
| `TAT` | Татарский |
| `UKR` | Украинский |
| `BEL` | Белорусский |
| `KKZ` | Казахский |
| `POL` | Польский |
| `ESP` | Испанский |
| `ITA` | Итальянский |
| `CHN` | Китайский |
| `JPN` | Японский |
| `ARA` | Арабский |
| `TUR` | Турецкий |
| `MAL` | Многоязычный |

Полный список включает ~90 языков: абхазский (`ABK`), аварский (`AVA`), азербайджанский (`AZE`), башкирский (`BAK`), болгарский (`BGR`), бурятский (`BUA`), венгерский (`HUN`), вьетнамский (`VIE`), грузинский (`GEO`), иврит (`HEB`), индонезийский (`IND`), корейский (`KOR`), латинский (`LAT`), литовский (`LIT`), монгольский (`MON`), узбекский (`UZB`), финский (`FIN`), чешский (`CES`), шведский (`SWE`), эстонский (`EST`) и др.

---

### 8.4 Справочник `typeRole` — роли авторов

| Код | Русский | English |
|-----|---------|---------|
| *(пусто)* | Автор (значение отсутствует) | Author |
| `0` | Редактор | Editor |
| `1` | Ответственный редактор | Executive editor |
| `2` | Научный редактор | Science editor |
| `3` | Переводчик | Translator |
| `4` | Составитель | Compiler |
| `5` | Фотограф | Photographer |
| `6` | Художник | Artist |
| `9` | Иллюстратор | Illustrator |
| `10` | Автор комментария | Comment author |
| `20` | Автор вступительной статьи | Author of the introductory article |
| `23` | Рецензент | Reviewer |
| `24` | Автор предисловия | Foreword by |
| `25` | Автор послесловия | Afterword |
| `26` | Научный руководитель | Supervisor |
| `48` | Редактор перевода | Translation editor |

---

### 8.5 Справочник `typeCorrespondent` — автор-корреспондент

| Код | Русский | English |
|-----|---------|---------|
| *(пусто)* | Автор (значение отсутствует) | Author |
| `0` | Автор | Author |
| `1` | Автор, отвечающий за переписку | Corresponding author |

---

### 8.6 Справочник `typeElement` — поля структурированной ссылки

Значения атрибута `field` в элементе `<element>` внутри `<refInfo>`.

| Код | Описание |
|-----|----------|
| `Authors` | Авторы публикации |
| `AuthorsNorm` | Нормализованные авторы |
| `DOI` | DOI публикации |
| `EDN` | EDN (eLIBRARY Document Number) |
| `GenreId` | Идентификатор жанра (можно не указывать) |
| `ISBN` | ISBN книги |
| `Issue` | Номер выпуска |
| `Name` | Название публикации |
| `PMID` | PubMed ID |
| `Pages` | Страницы |
| `SPage` | Начальная страница |
| `Title` | Название журнала/источника |
| `URL` | Электронная ссылка |
| `Volume` | Том |
| `YearPubl` | Год издания |
| `ArXiv` | ArXiv ID |
| `ZBMath` | ZBMath ID |
| `MathSciNet` | MathSciNet ID |
| `MathNet` | MathNet ID |
| `ADS` | ADS ID |
| `PlacePubl` | Место публикации (**устаревший**, не используется) |

---

### 8.7 Справочник `typeFileDesc` — типы файлов статьи

| Код | Русский | English |
|-----|---------|---------|
| `fullText` | Полный текст публикации (PDF или HTML) | Full text (PDF/HTML) |
| `addition` | Дополнительный материал (приложение) | Additional material |
| `illustration` | Иллюстрация к публикации | Illustration |

---

### 8.8 Справочник `typeUrlDesc` — типы ссылок на файлы

| Код | Русский | English |
|-----|---------|---------|
| `fullText` | Ссылка на полный текст PDF | Link to full text |
| `description` | Ссылка на описание публикации | Link to description |
| `preprint` | Ссылка на препринт | Link to preprint |
| `versionAnotherLanguage` | Ссылка на версию на другом языке | Another language version |
| `anotherEdition` | Ссылка на другое издание | Another edition |
| `continuation` | Ссылка на продолжение | Continuation |
| `beginning` | Ссылка на начало | Beginning |
| `application` | Ссылка на приложение | Application |
| `correction` | Ссылка на исправление | Correction |
| `addition` | Ссылка на дополнение | Addition |
| `review` | Ссылка на рецензию | Review |
| `comment` | Ссылка на комментарий | Comment |
| `mediaFile` | Ссылка на медиафайл | Media file |
| `presentation` | Ссылка на презентацию | Presentation |
| `data` | Ссылка на данные | Data |
| `additionalMaterials` | Ссылка на дополнительные материалы | Additional materials |
| `other` | Другое | Other |
