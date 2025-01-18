// Index.js

const form = document.getElementById("form");
const error = document.getElementById("error");
const conteiner = document.getElementById("conteiner");
const yearChosen = document.getElementById("yearChosen");
const confirmar = document.getElementById("confirm");

const getCalendar = async (year) => {
    const json = calendar(year);

    if (json.error == true) {
        error.innerHTML = json.message;
        error.style.display = "block";
        conteiner.style.display = "none";
    } else {
        conteiner.innerHTML = json.data;
        conteiner.style.display = "block";
        error.style.display = "none";
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    getCalendar(yearChosen.value);
});

function getToday() {
    const year = new Date().getFullYear();

    yearChosen.value = year;

    confirmar.click();
}

getToday();
