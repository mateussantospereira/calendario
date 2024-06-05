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

module.exports = goodFriday;