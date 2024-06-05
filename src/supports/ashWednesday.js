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

module.exports = ashWednesday;