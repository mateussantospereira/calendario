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

module.exports = computus;