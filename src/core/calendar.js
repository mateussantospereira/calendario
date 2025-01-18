// Calendário

function calendar(reqYear) {
    let res = validateInput(reqYear);
    
    if (res.status != 200) {
        return res;
    }

    let year = res.data;
    let weekDay = calculateWeekDay(year);
    let holidaysHTML = monthsToHTML(year, weekDay);
    let calendarHTML = calendarToHTML(year, holidaysHTML);
    
    return response(200, false, "Calendário calculado com êxito.", calendarHTML);
}

window.calendar = calendar;
