const computus = require("../supports/computus");
const gregorianEaster = require("../supports/gregorianEaster");
const goodFriday = require("../supports/goodFriday");
const ashWednesday = require("../supports/ashWednesday");
const corpusChristi = require("../supports/corpusChristi");
const romanNumeral = require("../supports/romanNumeral");
const response = require("../helpers/response");
const checkInputs = require("../helpers/checkInputs");

class calendarioController {
    calculate(req, res) {
        const fields = { year: { nome: "ano", max: 5, number: true } };
        let resultInputs = checkInputs(req.body, fields);
        let reqData = resultInputs.data;
        let maxYear = 5001;
        let minYear = 0;

        if (resultInputs.error == true) {
            response(res, 400, true, resultInputs.message);
            return;
        } else {
            let ano = Number(reqData.year);

            if (ano < minYear || ano > maxYear) {
                response(res, 400, true, `Erro. Digite um número maior do que ${minYear} e menor que ${maxYear}.`);
                return;
            }

            execute(ano);
        }

        function execute(year) {
            const calendar = calculate(year);

            response(res, 200, false, "Calendário calculado com êxito.", calendar);
        }

        function calculate(ate) {
            let nextDay = 6;
            let monthsByLine = 4; // meses em uma linha
            let notDay = `<td></td>`;
            let upside = `
                <tr>
                    <th>D</th><th>S</th><th>T</th><th>Q</th>
                    <th>Q</th><th>S</th><th>S</th>
                </tr>
            `;
            let textCalendar = "";
            let textHolidays = "";
            let century;

            if (ate % 100 > 0) {
                century = ((ate - ate % 100) / 100) + 1;
            } else {
                century = ate / 100;
            }

            class month {
                constructor(number, name, days) {
                    this.number = number;
                    this.name = name;
                    this.days = days;
                    this.content = [];
                }
            }

            let months = [
                new month(1, "Janeiro", 31),
                new month(2, "Fevereiro", 28),
                new month(3, "Março", 31),
                new month(4, "Abril", 30),
                new month(5, "Maio", 31),
                new month(6, "Junho", 30),
                new month(7, "Julho", 31),
                new month(8, "Agosto", 31),
                new month(9, "Setembro", 30),
                new month(10, "Outubro", 31),
                new month(11, "Novembro", 30),
                new month(12, "Dezembro", 31)
            ];

            class holiday {
                constructor(name, day, month, first) {
                    this.name = name;
                    this.day = day;
                    this.month = month;
                    this.first = first;
                }
            }

            let holidays = [
                new holiday("Ano novo", 1, "Janeiro", 1935),
                new holiday("Tiradentes", 21, "Abril", 1889),
                new holiday("Dia do Trabalho", 1, "Maio", 1924),
                new holiday("Independência do Brasil", 7, "Setembro", 1948),
                new holiday("Nossa Senhora Aparecida", 12, "Outubro", 1924),
                new holiday("Finados", 2, "Novembro", 2002),
                new holiday("Proclamação da Repúbica", 15, "Novembro", 1889),
                new holiday("Natal", 25, "Dezembro", 529)
            ];

            let easter;
            let goodFridayDay;
            let ashWednesdayDay;
            let corpusChristiDay;
            let firstEaster = 33;
            let firstAshWednesday = 325;
            let firstCorpusChristi = 1264;

            if (ate >= firstEaster) {
                if (ate < 1583) {
                    easter = computus(ate);
                } else {
                    easter = gregorianEaster(ate);
                }

                goodFridayDay = goodFriday(easter);

                holidays.unshift(new holiday(
                    "Páscoa",
                    easter.day,
                    easter.month,
                    firstEaster
                ));

                holidays.unshift(new holiday(
                    "Paixão de Cristo",
                    goodFridayDay.day,
                    goodFridayDay.month,
                    firstEaster
                ));
            }

            if (ate > firstAshWednesday) {
                ashWednesdayDay = ashWednesday(easter);

                holidays.unshift(new holiday(
                    "Quarta-feira de Cinzas",
                    ashWednesdayDay.day,
                    ashWednesdayDay.month,
                    firstAshWednesday
                ));
            }

            if (ate >= firstCorpusChristi) {
                corpusChristiDay = corpusChristi(easter);

                holidays.unshift(new holiday(
                    "Corpus Christi",
                    corpusChristiDay.day,
                    corpusChristiDay.month,
                    firstCorpusChristi
                ));
            }

            for (let year = 1; year <= ate; year++) {
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

                    if (year == ate) {
                        for (let emptyDay = 0; emptyDay < nextDay; emptyDay++) {
                            content.push(notDay);
                        }
                    }

                    for (let day = 1; day <= month.days; day++) {
                        if (year == ate) {
                            let recess = holidays.find(holiday => holiday.day === day && holiday.month === month.name && holiday.first <= year);

                            if (recess) {
                                textHolidays = textHolidays +
                                    `<p>${recess.name}, ${day} de ${recess.month}.</p>`;
                                content.push(`<td id="feriado">${day}</td>`);
                            } else {
                                content.push(`<td>${day}</td>`);
                            }

                            if (nextDay == 0 && year >= 321) {
                                if (year == 321) {
                                    if (month.number == 3 && day > 7) {
                                        content.pop();
                                        content.push(`<td id="domingo">${day}</td>`);
                                    }
                                    if (month.number > 3) {
                                        content.pop();
                                        content.push(`<td id="domingo">${day}</td>`);
                                    }
                                } else {
                                    content.pop();
                                    content.push(`<td id="domingo">${day}</td>`);
                                }
                            }

                            if (content.length % 8 == 0 && content.length != 0) {
                                content.push(`</tr><tr>`);
                            }
                        }

                        nextDay++;

                        if (nextDay == 7) {
                            nextDay = 0;
                        }

                        // Outubro de 1582

                        if (year == 1582 && month.name == `Outubro`) {
                            if (day == 4) {
                                day = day + 10;
                            }
                        }
                    }

                    if (year == ate) {
                        month.content = content;
                    }
                });
            }

            function standardize() {
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
                                            <div id="left"><div>${ate}</div></div>
                                            <div>${month.name}</div>
                                            <div id="right"><div>${ate}</div></div>
                                        </div>
                                    </caption>
                        `,
                        upside
                    );

                    month.content.push(`</tbody></table></div>`);
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

                let text = "";

                months.forEach((month) => {
                    month.content.forEach((content) => {
                        text = text + content;
                    });
                });

                if (textHolidays != "") {
                    textHolidays = `
                        <div class="center">
                            <div id="holidays">
                                <p id="b"><b>Feriados:</b></p>
                                ${textHolidays}
                            </div>
                        </div>
                    `;
                }

                const romanYear = romanNumeral(ate);
                const romanCentury = romanNumeral(century);

                text = `
                    <div id="calendar">
                        <div class="center">
                            <div>
                                <h1 id="title" class="title">Calendário de ${ate}</h1>
                                <h2 id="ano-romano" class="title">${romanYear}</h2>
                                <h2 id="seculo-romano" class="title">Século ${romanCentury}</h2>
                            </div>
                        </div>

                        <hr>

                        <div id="months">
                            <div id="calendar-content">
                            ${text}
                            </div>
                        </div>
                    </div>

                    </div>

                    ${textHolidays}
                `;

                textCalendar = text;
            }

            standardize();

            return textCalendar;
        }
    }
}

module.exports = new calendarioController;