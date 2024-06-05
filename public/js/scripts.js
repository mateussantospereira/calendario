let form = document.querySelector(`#form`);
let error = document.querySelector(`#error`);
let conteiner = document.querySelector(`#conteiner`);

const teste = async (year) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    let urlencoded = new URLSearchParams();

    urlencoded.append("year", String(year));

    let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded
    };

    const response = await fetch(`/calculate`, requestOptions);
    const json = await response.json();

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

    teste(form.yearChosen.value);
});