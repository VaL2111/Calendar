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
        title: "День<br>Незалежності",
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
    const monthsInYear = 12;

    for (let i = 0; i < monthsInYear; i++) {
        renderMonth(i, year);
    }
}

function renderMonth(monthIdx, year)
{
    const {title, name, length} = months[monthIdx];
    const monthHead = buildMonthHead(title, name);
    const weekDaysNames = buildWeekDaysNames();
    const monthDates = buildDates(year, monthIdx, length);

    const monthBox = document.createElement('div');
    monthBox.innerHTML = `
        ${monthHead}
        <div class="month-content">
            ${weekDaysNames}
            ${monthDates}
        </div>
    `;

    dom.calendar.appendChild(monthBox);
}

function buildMonthHead(title, name)
{
    return `
        <div class="month-title">${title}</div>
        <div class="month-name">${name}</div>
    `;
}

function buildWeekDaysNames()
{
    const weekDayNames = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'НД'];
    let weekDaysHTML = "";

    for (let i = 0; i < weekDayNames.length; i++) {
        weekDaysHTML += `
            <div class="month-date month-date-accent">
                 ${weekDayNames[i]}
             </div>
        `;
    }

    return weekDaysHTML;
}

function buildDates(year, month, monthLength)
{
    let weekDayStart = new Date(year, month, 1).getDay();
    weekDayStart = (weekDayStart === 0) ? 7 : weekDayStart;

    let datesHTML = "";

    for (let i = 1; i < weekDayStart; i++) {
        datesHTML += buildDate("");
    }

    for (let i = 1; i <= monthLength; i++) {
        datesHTML += buildDate(i);
    }

    return datesHTML;
}

function buildDate(content, isAccent = false)
{
    const cls = isAccent ? 'month-date month-date-accent' : 'month-date';
    return `<div class="${cls}">${content}</div>`;
}

renderCalendar(year);
