class weekDay {
    constructor(number, name) {
        this.number = number;
        this.name = name;
    }
}

let week = [
    new weekDay(0, "Domingo"),
    new weekDay(1, "Segunda-feira"),
    new weekDay(2, "Terça-feira"),
    new weekDay(3, "Quarta-feira"),
    new weekDay(4, "Quinta-feira"),
    new weekDay(5, "Sexta-feira"),
    new weekDay(6, "Sábado"),
]

window.week = week;
