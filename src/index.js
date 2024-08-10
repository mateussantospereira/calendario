// Calendário Controller

class calendarioController {
    calculate(reqYear) {
        reqYear = { year: reqYear };
        const fields = { year: { nome: "ano", max: 5, number: true } };
        let resultInputs = checkInputs(reqYear, fields);
        let reqData = resultInputs.data;
        let maxYear = 5001;
        let minYear = 0;

        if (resultInputs.error == true) {
            return response(400, true, resultInputs.message);
        } else {
            let ano = Number(reqData.year);

            if (ano < minYear || ano > maxYear) {
                return response(400, true, `Erro. Digite um número maior do que ${minYear} e menor que ${maxYear}.`);
            }

            return execute(ano);
        }

        function execute(year) {
            const calendar = calculate(year);

            return response(200, false, "Calendário calculado com êxito.", calendar);
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

// ----------------------------------------------------

// Supports

// Quarta-feira de cinzas

function ashWednesday(easter) {
    let day = 0;
    let month = "Fevereiro";
    let year = easter.year;
    let february = 28;
    let march = 31;

    if (year > 1581) {
        if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
            february = 29;
        }
    } else {
        if (year % 4 == 0) {
            february = 29;
        }
    }

    if (easter.month == "Março") {
        day = (easter.day + february) - 46;
    }

    if (easter.month == "Abril") {
        day = (easter.day + february + march) - 46;
    }

    if (day > february) {
        day = day - february;
        month = "Março";
    }

    return {
        day: day,
        month: month, 
        year: year
    };
}

// Computus de Dionysius Exiguus

function computus(year) {
    let month = (year + 1) % 19;
    let epact = ((year % 19) * 11) % 30;
    let concurrent = (year + (year / 4 - (year / 4 % 1)) + 4) % 7;
    let paschalMoon = 0;
    let moonDay = 0;
    let monthMoon;
    let monthPaschal;
    let paschalDay = moonDay;
    let accountant = 0;
    
    if (month == 2 || month == 5 || month == 7 || month == 10 || month == 13 || month == 16 || month == 18) {
        monthMoon = `Março`;
    } else {
        monthMoon = `Abril`;
    }

    if (monthMoon == `Março`) {
        moonDay = 36 - epact;

        if (moonDay > 30) {
            moonDay = moonDay - 30;
        }

        paschalMoon = (moonDay + concurrent + 4) % 7;
    } else {
        moonDay = 35 - epact;

        if (moonDay > 30) {
            moonDay = moonDay - 30;
        }

        paschalMoon = (moonDay + concurrent + 7) % 7;
    }

    paschalDay = moonDay;

    if (paschalMoon == 0) {
        paschalDay++;
    } else {
        while (accountant < 8 - paschalMoon) {
            paschalDay++
            accountant++;
        }
    }

    if (paschalDay > 31) {
        monthPaschal = `Abril`;

        paschalDay = paschalDay - 31;
    } else {
        monthPaschal = monthMoon;
    }

    return {
        day: paschalDay,
        month: monthPaschal,
        year: year
    };
}

// Corpus Christi

function corpusChristi(easter) {
    let day = easter.day + 60;
    let month;
    
    if (easter.month == "Abril") {
        day = day + 31;
    }
    
    day = day - 31 - 30;
    
    if (day > 31) {
        month = "Junho";
        day = day - 31;
    } else {
        month = "Maio";
    }

    return { day: day, month: month };
}

// Sexta-feira Santa

function goodFriday(easter) {
    let day = easter.day - 2;
    let month;

    if (day <= 0) {
        day = 31 + day;
        month = `Março`;
    } else {
        month = easter.month;
    }

    return {
        day: day,
        month: month,
        year: easter.year
    };
}

// Date of Easter in Gregorian Calendar of T.O'Beirne 

function gregorianEaster(year) {
    let moonMonth;
    let moonDay;
    let paschalMonth;
    let paschalDay;

    let c = (year - year % 100) / 100;
    let b = (c - 15) * 3;
    let q = (b - b % 4) / 4 + 10
    let l = 7 - ((year - year % 4) / 4 + year + 4 - q) % 7;
    let g = year % 19 + 1;
    let JulianEpact = (g * 11 - 10) % 30;
    let solar_equation = q - 10;
    let h = (c - 14) * 8;
    let lunar_equation = (h - h % 25) / 25;
    let e = (JulianEpact - solar_equation + lunar_equation);

    if (e < 1) {
        while (e < 1) {
            e = e + 30;
        }
    }

    let epact = e % 30;

    if (g > 11 && epact == 25) {
        epact = 26;
    } else if (epact == 24) {
        epact = 25;
    }

    let d;

    if (epact < 24) {
        d = 44 - epact;
    } else {
        d = 74 - epact;
    }

    moonDay = d;

    if (d < 32) {
        moonMonth = `Março`;
    } else {
        moonMonth = `Abril`;

        moonDay = d - 31;
    }

    let w = (d + 10 - l) % 7 + 1;

    paschalDay = moonDay;

    if (w == 0) {
        paschalDay++;
    } else {
        let accountant = 0;

        while (accountant < 8 - w) {
            paschalDay++;
            accountant++;
        }
    }

    if (paschalDay > 31) {
        paschalMonth = `Abril`;

        paschalDay = paschalDay - 31;
    } else {
        paschalMonth = moonMonth;
    }

    return {
        day: paschalDay,
        month: paschalMonth,
        year: year
    }
}

// Algarismo Romano

function romanNumeral(arabico) {
    class decimal {
        constructor(ordem, content) {
            this.quantidade = (arabico % Math.pow(10, ordem) - arabico % Math.pow(10, ordem - 1)) / Math.pow(10, ordem - 1);
            this.content = content;
        }
    }

    let ordens = [
        new decimal(7, ["M̅"]),
        new decimal(6, ["C̅", "D̅", "M̅"]),
        new decimal(5, ["X̅", "L̅", "C̅"]),
        new decimal(4, ["M", "I̅", "V̅", "X̅"]),
        new decimal(3, ["C", "D", "M"]),
        new decimal(2, ["X", "L", "C"]),
        new decimal(1, ["I", "V", "X"]),
    ];

    let algarismoRomano = "";

    ordens.forEach((ordem) => {
        function write(vezes, text) {
            for (let count = 0; count < vezes; count++) {
                algarismoRomano = algarismoRomano + text;
            }
        }

        function postWritten(vezes, number) {
            if (ordem.content.length == 4) {
                write(vezes, `${ordem.content[number + 1]}`);
            } else {
                write(vezes, `${ordem.content[number]}`);
            }
        }

        if (ordem.quantidade == 4) {
            postWritten(1, 0);
            postWritten(1, 1);
        } else if (ordem.quantidade == 9) {
            postWritten(1, 0);
            postWritten(1, 2);
        } else if (ordem.quantidade >= 5) {
            let rest = ordem.quantidade - 5;
            postWritten(1, 1);
            postWritten(rest, 0);
        } else {
            write(ordem.quantidade, ordem.content[0]);
        }
    });

    return algarismoRomano;
}

// ----------------------------------------------------

// Helpers

// CheckInputs

function checkInputs(body, fields) {
    let res = { error: null, message: null, data: null };
    let keysBody = Object.keys(body);
    let keys = Object.keys(fields);
    let data = {};

    function atribuir(error, message, data) {
        res = { error: error, message: message, data: data };
    }

    function checkKey() {
        keysBody.forEach((key) => {
            if (!keys.includes(key)) {
                atribuir(true, "Erro nas chaves de valores da requisição. Envie apenas as chaves necessárias.");
                return;
            };
        });

        keys.forEach((key) => {
            if (!keysBody.includes(key)) {
                atribuir(true, "Erro nas chaves de valores da requisição. Chaves faltantes.");
                return;
            };
        });
    }

    function checkValues() {
        for (let key of keys) {
            let text = `${body[key]}`.trim();

            const textUndefined = () => {
                atribuir(true, `Erro. O campo ${fields[key].nome} está indefinido.`);
            };

            if (fields[key].number) {
                if (fields[key].number == true) {
                    if (typeof (Number(text)) == "number") {
                        if (Number(text) <= 0) {
                            atribuir(true, `Erro. O campo ${fields[key].nome} deve ser um número válido.`);
                            break;
                        }
                    } else {
                        atribuir(true, `Erro. O campo ${fields[key].nome} deve ser um número.`);
                        break;
                    }
                }
            }

            if (fields[key].min) {
                if (text.length < fields[key].min && text != "") {
                    atribuir(true, `Erro. O campo ${fields[key].nome} não tem o mínimo de ${fields[key].min} caracteres.`);
                    break;
                }
            }

            if (text.length > fields[key].max) {
                atribuir(true, `Erro. O campo ${fields[key].nome} ultrapassou o limite de ${fields[key].max} caracteres.`);
                break;
            }

            fields[key].text = text;
            data[key] = text;
        }
    }

    checkKey();

    if (res.error == true) {
        return res;
    } else {
        checkValues();
    }

    if (res.error != true) {
        atribuir(false, "Campos padronizados.", data);
    }

    return res;
}

// Response

function response(status, error, message, data = null) {
    return { status: status, error: error, message: message, data: data };
}

// ----------------------------------------------------

// Index.js

let form = document.getElementById("form");
let error = document.getElementById("error");
let conteiner = document.getElementById("conteiner");

const getCalendar = async (year) => {
    const json = new calendarioController().calculate(year);

    if (json.error == true) {
        error.innerHTML = json.message;
        error.style.display = "block";
        conteiner.style.display = "none";
    } else {
        conteiner.innerHTML = json.data;
        conteiner.style.display = "block";
        error.style.display = "none";
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    getCalendar(form.yearChosen.value);
});