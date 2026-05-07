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

