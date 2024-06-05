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

module.exports = corpusChristi;