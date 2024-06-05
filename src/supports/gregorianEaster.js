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

module.exports = gregorianEaster;