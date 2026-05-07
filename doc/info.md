---

После того как мы выбрали сайт.

Должен появиться select в котором будет выборка журнала

Пример:

По запросу https://mmi.ddev.site/api/generate-abis/journal-number

мы получаем след. данные

[
    {
        "id": "4923",
        "title": {
            "ru": "Известия Саратовского университета. Новая серия. Серия «Математика. Механика. Информатика» 2006, Т. 6, вып. 1",
            "en": "Izvestiya of Saratov University. New Series. Series: Mathematics. Mechanics. Informatics 2006, vol. 6, iss. 1"
        },
        "year": "2006",
        "volume": "6",
        "number": "1",
        "part": "",
        "journal_no_start": "",
        "journal_no_end": ""
    },
    {
        "id": "4924",
        "title": {
            "ru": "Известия Саратовского университета. Новая серия. Серия «Математика. Механика. Информатика» 2007, Т. 7, вып. 2",
            "en": "Izvestiya of Saratov University. New Series. Series: Mathematics. Mechanics. Informatics 2007, vol. 7, iss. 2"
        },
        "year": "2007",
        "volume": "7",
        "number": "2",
        "part": "",
        "journal_no_start": "",
        "journal_no_end": ""
    },
	...
]

нам нужно сделать select который бутет иметь в value = id, а текст будет выводить title.ru

---
# Логика
Пользователь выбирает сайт → появляется секция "Выбор журнала"
Идёт запрос {siteUrl}/api/generate-abis/journal-number с индикатором загрузки
Select заполняется: value = id, label = title.ru
При смене сайта — selectedJournalId сбрасывается, journals перезагружаются
При ошибке — показывается Alert с описанием

---



Необходимо сделать сортировку вывода от большего к меньшему для select журналов

так как мы получаем след данные 

[
    {
        "id": "4923",
        "title": {
            "ru": "Известия Саратовского университета. Новая серия. Серия «Математика. Механика. Информатика» 2006, Т. 6, вып. 1",
            "en": "Izvestiya of Saratov University. New Series. Series: Mathematics. Mechanics. Informatics 2006, vol. 6, iss. 1"
        },
        "year": "2006",
        "volume": "6",
        "number": "1",
        "part": "",
        "journal_no_start": "",
        "journal_no_end": ""
    },
    {
        "id": "4924",
        "title": {
            "ru": "Известия Саратовского университета. Новая серия. Серия «Математика. Механика. Информатика» 2007, Т. 7, вып. 2",
            "en": "Izvestiya of Saratov University. New Series. Series: Mathematics. Mechanics. Informatics 2007, vol. 7, iss. 2"
        },
        "year": "2007",
        "volume": "7",
        "number": "2",
        "part": "",
        "journal_no_start": "",
        "journal_no_end": ""
    },
	...
]

нам нужно отсортировать по след данными volume, number, part

---


журнал выбран.
Мы должны сохранить id журнала


создать новую секцию
Название: "Содержание"

Необходимо пройти по запросу https://mmi.ddev.site/api/generate-abis/journal-list/{id журнала}

пример ответа:

[
    {
        "id": 7430,
        "title": {
            "ru": "Предельное распределение ранга дружбы в сложных сетях",
            "en": "Limiting distribution of friendship rank in complex networks"
        }
    },
    {
        "id": 7431,
        "title": {
            "ru": "О задаче оптимального по времени управления для уравнения теплопроводности с инволюцией",
            "en": "On a time-optimal control problem for a heat conduction equation with involution"
        }
    },
]

вывести названия статей title.ru

---


При формировании Содержания должен быть создан список id - статей. назовем переменную journalArticleListID

Далее создается секция Генерация xml для РИНЦ(elibrary.ru)

Получаем данные по запросу 
/api/generate-abis/journal-data

Должно прийти следующего формата
{
    "titleid": "11982",
    "issnPrint": "1816-9791",
    "issnOnline": "2541-9005"
    "elibraryTitle": {
        "ru": "Известия Саратовского университета. Новая серия. Серия: Математика. Механика. Информатика",
        "en": "Izvestiya of Saratov University. Mathematics. Mechanics. Informatics"
    }
}


Проверяем на существование "titleid", "issnPrint", "issnOnline", elibraryTitle.ru и elibraryTitle.en

если titleid пусто то выводим сообщение titleid не обнаружен процесс остановлен.
если titleid пусто то выводим сообщение issnPrint не обнаружен процесс остановлен.
если titleid пусто то выводим сообщение issnOnline не обнаружен процесс остановлен.
если titleid пусто то выводим сообщение elibraryTitle.ru не обнаружен процесс остановлен.
если titleid пусто то выводим сообщение elibraryTitle.en не обнаружен процесс остановлен.

Если "titleid", "issnPrint", "issnOnline", elibraryTitle.ru и elibraryTitle.en все существуют то выполняем следующее иначе останавливаем процесс

metadata = {
    "titleid": "11982",
    "issnPrint": "1816-9791",
    "issnOnline": "2541-9005"
    "elibraryTitle": {
        "ru": "Известия Саратовского университета. Новая серия. Серия: Математика. Механика. Информатика",
        "en": "Izvestiya of Saratov University. Mathematics. Mechanics. Informatics"
    }
}


начинаем создавать 
elibraryXML = '
<?xml version="1.0" encoding="utf-16" standalone="no"?>
<journal>
    <titleid>metadata.titleid</titleid>
    <issn>metadata.issnPrint</issn>
    <eissn>metadata.issnOnline</eissn>
    <journalInfo lang="RUS">
        <title> metadata.elibraryTitle.ru </title>
    </journalInfo>
    <journalInfo lang="ENG">
        <title> metadata.elibraryTitle.en </title>
    </journalInfo>
    <issue>
        <volume>journalNumberData.volume</volume>
        <number>journalNumberData.number</number>
        <dateUni>journalNumberData.year</dateUni>
        <pages>  {journalNumberData.journal_no_start}-{journalNumberData.journal_no_end}</pages>
        <articles>
'


Проходим циклом каждый id из journalArticleListID

Пусть каждый отдельный id из списка journalArticleListID заносится в переменную journalArticleID

начало цикла

elibraryXML += '
<section>
    <secTitle lang="RUS"> {journalArticleID.heading.ru} </secTitle>
    <secTitle lang="ENG"> {journalArticleID.heading.en} </secTitle>
</section>
'

elibraryXML += '
<article>
    <pages>{journalArticleID.page_no}-{journalArticleID.page_no_to}</pages>
    <artType>{journalArticleID.typersci.abbreviation}</artType>
    <authors>
        <author num={journalArticleID.autor.num}> 
            <authorCodes>
                Если существует journalArticleID.autor.researcherid то <researcherid>{journalArticleID.autor.researcherid}</researcherid>
                Если существует journalArticleID.autor.spin то <spin>{journalArticleID.autor.spin}</spin>
                Если существует journalArticleID.autor.scopusid то <scopusid>{journalArticleID.autor.scopusid}</scopusid>
                Если существует journalArticleID.autor.orcid то <orcid>{journalArticleID.autor.orcid}</orcid>
            </authorCodes>
            <individInfo lang="RUS">
                <surname>{journalArticleID.autor.surname.ru}</surname>
                <initials>{journalArticleID.autor.initials.ru}</initials>
                <orgName>{journalArticleID.autor.company.data.orgName.ru}</orgName>
                <address>{journalArticleID.autor.company.data.address.ru}</address>
            </individInfo>
            <individInfo lang="ENG">
                <surname>{journalArticleID.autor.surname.en}</surname>
                <initials>{journalArticleID.autor.initials.en}</initials>
                <orgName>{journalArticleID.autor.company.data.orgName.en}</orgName>
                <address>{journalArticleID.autor.company.data.address.en}</address>
            </individInfo>
        </author>
    </authors>
    <artTitles>
        <artTitle lang="RUS">{ journalArticleID.title.ru }</artTitle>
        <artTitle lang="ENG">{ journalArticleID.title.en}</artTitle>
    </artTitles>
    <abstracts>
        <abstract lang="RUS">{ journalArticleID.body.ru }</abstract>
        <abstract lang="ENG"> { journalArticleID.body.en }</abstracts>
    <text lang="ANY"> { fulltext }</text>
    <codes>
        <udk> {journalArticleID.udk}</udk>
        <doi>{journalArticleID.doi}</doi>
        <edn> {journalArticleID.edn}</edn>
    </codes>
    <keywords>
        <kwdGroup lang="RUS">
            for key_word in journalArticleID.key_words.ru_page
            <keyword>{key_word.ru}</keyword>
        </kwdGroup>
        <kwdGroup lang="ENG">
            for key_word in journalArticleID.key_words.en_page
            <keyword>{key_word.en}</keyword>
        </kwdGroup>
    </keywords>
    <dates>
        <dateReceived>{journalArticleID.date_received}</dateReceived>
        <dateAccepted>{journalArticleID.accepted}</dateAccepted>
        <datePublication>{journalArticleID.published}</datePublication>
    </dates>
    <references>
        <reference>
            for lit in journalArticleID.literature
            <refInfo lang="ANY">
                <text>{lit.text}</text>
            </refInfo>
    </reference>
    <files>
        <file desc="fullText">{journalArticleID.text_pdf.filename}</file>
    </files>
</article>
'


завершение цикла.


elibraryXML += '
        <articles>
    </issue>
</journal>
'

нужно вывести полученый результат в textarea с возможностью копировать,
а так же с возможностью скачать файл xml. имя при сохранении xml дать следующее  {journalNumberData.title.en}-elibrary.xml