// Validar o Input

function validateInput(reqYear) {
    reqYear = { year: reqYear };
    let fields = { year: { nome: "ano", max: 5, number: true } };
    let resultInputs = checkInputs(reqYear, fields);
    let reqData = resultInputs.data;
    let maxYear = 5001;
    let minYear = 0;

    if (resultInputs.error == true) {
        return response(400, true, resultInputs.message);
    }

    let year = Number(reqData.year);

    if (year < minYear || year > maxYear) {
        return response(400, true, 
            `Erro. Digite um número maior do que ${minYear} e menor que ${maxYear}.`
        );
    }

    return response(200, false, "Entrada validada com êxito.", year);

}

window.validateInput = validateInput;
