// Calendário HTML

function calendarToHTML(year, holidaysHTML) {
    let notDay = "<td></td>";
    let monthsByLine = screenSize(); // meses em uma linha
    let century = year % 100 > 0 ?
        ((year - year % 100) / 100) + 1 :
        year / 100;

    months.forEach((month) => {
        while (month.content.length < 48) {
            if (month.content.length % 8 == 0 && month.content.length != 0) {
                month.content.push(`</tr><tr>`);
            }

            month.content.push(notDay);
        }
    });

    months.forEach((month) => {
        month.content.unshift(`
            <div id="month">
                <table>
                    <tbody>
                        <caption>
                            <div>
                                <div id="left"><div>${year}</div></div>
                                <div>${month.name}</div>
                                <div id="right"><div>${year}</div></div>
                            </div>
                        </caption>
                        
                        <tr>
                            <th>D</th><th>S</th><th>T</th><th>Q</th>
                            <th>Q</th><th>S</th><th>S</th>
                        </tr>
        `);

        month.content.push(`
                    </tbody>
                </table>
            </div>
        `);

    });

    let nextMonth = 0;

    months.forEach((month) => {
        if (nextMonth % monthsByLine == 0 && nextMonth != 0) {
            month.content.unshift(`</div><div id="line">`);
        } else if (nextMonth == 0) {
            month.content.unshift(`<div id="line">`);
        }

        nextMonth++;
    });

    months.at(-1).content.push("</div>");

    let html = "";

    months.forEach((month) => {
        month.content.forEach((content) => {
            html = html + content;
        });
    });

    if (holidaysHTML != "") {
        holidaysHTML = `
            <div class="center">
                <div id="holidays">
                    <p id="b"><b>Feriados:</b></p>
                    
                    ${holidaysHTML}
                </div>
            </div>
        `;
    }

    const romanYear = romanNumeral(year);
    const romanCentury = romanNumeral(century);

    html = `
        <div id="calendar">
            <div class="center">
                <div>
                    <h1 id="title" class="title">Calendário de ${year}</h1>
                    <h2 id="ano-romano" class="title">${romanYear}</h2>
                    <h2 id="seculo-romano" class="title">Século ${romanCentury}</h2>
                </div>
            </div>

            <hr>

            <div id="months">
                <div id="calendar-content">
                    ${html}
                </div>
            </div>
        </div>

        ${holidaysHTML}
    `;

    return html;
}

window.calendarToHTML = calendarToHTML;
