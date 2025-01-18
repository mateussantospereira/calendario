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

window.months = months;
