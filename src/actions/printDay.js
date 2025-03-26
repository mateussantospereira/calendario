function printDay(dayText) {
    let values = dayText.split("-");
    let month = values[0];
    let day = values[1];
    let content = daysValues[month][day];
    const dayHTML = document.getElementById("day");
    
    let text = content.title;

    if (content.holiday) {
        text = text + content.holiday;
    }

    dayHTML.innerHTML = text;
}

window.printDay = printDay;
