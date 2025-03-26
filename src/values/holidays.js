class holiday {
    constructor(name, day, month, first) {
        this.name = name;
        this.day = day;
        this.month = month;
        this.first = first;
    }
}

function standardHolidays() {
    return [
        new holiday("Santa Maria, Mãe de Deus", 1, "Janeiro", 432),
        new holiday("Tiradentes", 21, "Abril", 1889),
        new holiday("Dia do Trabalho", 1, "Maio", 1924),
        new holiday("Independência do Brasil", 7, "Setembro", 1948),
        new holiday("Nossa Senhora Aparecida", 12, "Outubro", 1924),
        new holiday("Finados", 2, "Novembro", 2002),
        new holiday("Proclamação da Repúbica", 15, "Novembro", 1889),
        new holiday("Natal", 25, "Dezembro", 529)
    ];
}

window.standardHolidays = standardHolidays;
window.holidays = standardHolidays();
