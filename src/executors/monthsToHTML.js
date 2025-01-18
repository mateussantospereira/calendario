// Construir os meses em HTML

function monthsToHTML(year, weekDay) {
    let monthsByLine = 4; // meses em uma linha
    let notDay = `<td></td>`;
    let holidaysHTML = "";
    
    holidayEaster(year);

    if (year > 1581) {
        if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
            months[1].days = 29;
        } else {
            months[1].days = 28;
        }
    } else {
        if (year % 4 == 0) {
            months[1].days = 29;
        } else {
            months[1].days = 28;
        }
    }

    months.forEach((month) => {
        let content = [`<tr>`];

        for (let emptyDay = 0; emptyDay < weekDay; emptyDay++) {
            content.push(notDay);
        }

        for (let day = 1; day <= month.days; day++) {
            let holiday = holidays.find(
                h => 
                h.day === day &&
                h.month === month.name &&
                h.first <= year
            );

            let tdDay = `<td>${day}</td>`;
            let tdHoliday = `<td id="feriado">${day}</td>`;
            let tdSunday = `<td id="domingo">${day}</td>`;
            let tdToday = `<td id="hoje">${day}</td>`; 

            if (holiday) {
                holidaysHTML = holidaysHTML +
                `<p>${holiday.name}, ${day} de ${holiday.month}.</p>`;
                
                content.push(tdHoliday);
            } else {
                content.push(tdDay);
            }

            if (weekDay == 0 && year >= 321) {
                if (year == 321) {
                    if (month.number == 3 && day > 7) {
                        content.pop();
                        content.push(tdSunday);
                    }
                    if (month.number > 3) {
                        content.pop();
                        content.push(tdSunday);
                    }
                } else {
                    content.pop();
                    content.push(tdSunday);
                }
            }

            let dayToday = today.day == day &&
                today.month == month.number &&
                today.year == year;

            if (dayToday) {
                content.pop();
                content.push(tdToday);
            }

            if (content.length % 8 == 0 && content.length != 0) {
                content.push(`</tr><tr>`);
            }


            weekDay++;

            if (weekDay == 7) {
                weekDay = 0;
            }

            // Outubro de 1582

            if (year == 1582 && month.name == `Outubro`) {
                if (day == 4) {
                    day = day + 10;
                }
            }
        }

        month.content = content;
    });

    return holidaysHTML;
}

window.monthsToHTML = monthsToHTML;
