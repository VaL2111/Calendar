const dom = {
    calendar: document.getElementById('calendar'),
    year: document.getElementById('year'),
}

const year = new Date().getFullYear();
dom.year.innerHTML = `${year}`;

function getFebruaryLength(year)
{
    const march = 2;
    const lastDayPreviousMonth = 0;

    return new Date(year, march, lastDayPreviousMonth).getDate();
}

const months = [
    {
        title: "Новий<br>Рік",
        name: "Січень",
        length: 31,
    },
    {
        title: "День<br>святого Валентина",
        name: "Лютий",
        length: getFebruaryLength(year),
    },
    {
        title: "Міжнародний<br>жіночий день",
        name: "Березень",
        length: 31,
    },
    {
        title: "Великдень<br>Пасха",
        name: "Квітень",
        length: 30,
    },
    {
        title: "День<br>матері",
        name: "Травень",
        length: 31,
    },
    {
        title: "День<br>захисту дітей",
        name: "Червень",
        length: 30,
    },
    {
        title: "Міжнародний<br>день шахів",
        name: "Липень",
        length: 31,
    },
    {
        title: "День<br>Незалежності України",
        name: "Серпень",
        length: 31,
    },
    {
        title: "День<br>знань",
        name: "Вересень",
        length: 30,
    },
    {
        title: "Всесвітній<br>день учителів",
        name: "Жовтень",
        length: 31,
    },
    {
        title: "День<br>студента",
        name: "Листопад",
        length: 30,
    },
    {
        title: "День<br>святого Миколая",
        name: "Грудень",
        length: 31,
    }
];

function renderCalendar(year)
{
    for (let i = 0; i < 12; i++) {
        renderMonth(i, year);
    }
}

function renderMonth(monthIdx, year)
{
    const monthName = months[monthIdx].name;
    const monthTitle = months[monthIdx].title;
    const monthLength = months[monthIdx].length;
    const monthHead = buildMonthHead(monthTitle, monthName);
    const weekDaysNames = buildWeekDaysNames();
    const monthDates = buildDates(year, monthIdx, monthLength);
    const monthBox = document.createElement('div');
    monthBox.className = 'month';

    const monthContentHTML = [];
    monthContentHTML.push(monthHead);
    monthContentHTML.push('<div class="month-content">');
    monthContentHTML.push(weekDaysNames);
    monthContentHTML.push(monthDates);
    monthContentHTML.push('</div>');

    monthBox.innerHTML = monthContentHTML.join("");
    dom.calendar.appendChild(monthBox);
}

function buildMonthHead(title, monthName)
{
    return `
        <div class="month-title">${title}</div>
        <div class="month-name">${monthName}</div>
    `;
}

function buildWeekDaysNames()
{
    const weekDayNames = [
        'ПН',
        'ВТ',
        'СР',
        'ЧТ',
        'ПТ',
        'СБ',
        'НД'
    ];
    const daysNames = [];
    const weekLength = 7;

    for (let i = 0; i < weekLength; i++) {
        const dayNameTag = `
            <div class="month-date month-date-accent">${weekDayNames[i]}</div> 
        `;
        daysNames.push(dayNameTag);
    }

    return daysNames.join(" ");
}

function buildDates(year, month, monthLength)
{
    const firstWeekDay = 1;
    const date = new Date(year, month, firstWeekDay);
    let weekDayStart = date.getDay();
    let dayCounter = 1;
    const monday = 1;
    let isEmptyBox = true;

    const datesHTML = [];

    if (weekDayStart === 0) {
        weekDayStart = 7;
    }

    while (dayCounter <= monthLength) {
        if ((weekDayStart > monday) && isEmptyBox) {
            for(let i = 1; i < weekDayStart; i++) {
                const dateHTML = buildDate("");
                datesHTML.push(dateHTML);
            }
            isEmptyBox = false;
        }
        else {
            const dateHTML = buildDate(dayCounter);
            datesHTML.push(dateHTML);
            dayCounter++;
        }
    }

    return datesHTML.join("");
}

function buildDate(content, isAccent = false)
{
    const cls = isAccent ? 'month-date month-date-accent' : 'month-date';
    return `<div class="${cls}">${content}</div>`;
}

renderCalendar(year);
