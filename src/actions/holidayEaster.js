// Feriado da Páscoa

function holidayEaster(year) {
    let easter;
    let goodFridayDay;
    let ashWednesdayDay;
    let corpusChristiDay;
    let firstEaster = 33;
    let firstAshWednesday = 325;
    let firstCorpusChristi = 1264;
    
    holidays = standardHolidays();
    
    if (year >= firstEaster) {
        if (year < 1583) {
            easter = computus(year);
        } else {
            easter = gregorianEaster(year);
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

    if (year > firstAshWednesday) {
        ashWednesdayDay = ashWednesday(easter);

        holidays.unshift(new holiday(
            "Quarta-feira de Cinzas",
            ashWednesdayDay.day,
            ashWednesdayDay.month,
            firstAshWednesday
        ));
    }

    if (year >= firstCorpusChristi) {
        corpusChristiDay = corpusChristi(easter);

        holidays.unshift(new holiday(
            "Corpus Christi",
            corpusChristiDay.day,
            corpusChristiDay.month,
            firstCorpusChristi
        ));
    }

    return holidays;
}

window.holidayEaster = holidayEaster;
