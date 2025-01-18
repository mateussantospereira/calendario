// CheckInputs

function checkInputs(body, fields) {
    let res = { error: null, message: null, data: null };
    let keysBody = Object.keys(body);
    let keys = Object.keys(fields);
    let data = {};

    function atribuir(error, message, data) {
        res = { error: error, message: message, data: data };
    }

    function checkKey() {
        keysBody.forEach((key) => {
            if (!keys.includes(key)) {
                atribuir(true, "Erro nas chaves de valores da requisição. Envie apenas as chaves necessárias.");
                return;
            };
        });

        keys.forEach((key) => {
            if (!keysBody.includes(key)) {
                atribuir(true, "Erro nas chaves de valores da requisição. Chaves faltantes.");
                return;
            };
        });
    }

    function checkValues() {
        for (let key of keys) {
            let text = `${body[key]}`.trim();

            const textUndefined = () => {
                atribuir(true, `Erro. O campo ${fields[key].nome} está indefinido.`);
            };

            if (fields[key].number) {
                if (fields[key].number == true) {
                    if (typeof (Number(text)) == "number") {
                        if (Number(text) <= 0) {
                            atribuir(true, `Erro. O campo ${fields[key].nome} deve ser um número válido.`);
                            break;
                        }
                    } else {
                        atribuir(true, `Erro. O campo ${fields[key].nome} deve ser um número.`);
                        break;
                    }
                }
            }

            if (fields[key].min) {
                if (text.length < fields[key].min && text != "") {
                    atribuir(true, `Erro. O campo ${fields[key].nome} não tem o mínimo de ${fields[key].min} caracteres.`);
                    break;
                }
            }

            if (text.length > fields[key].max) {
                atribuir(true, `Erro. O campo ${fields[key].nome} ultrapassou o limite de ${fields[key].max} caracteres.`);
                break;
            }

            fields[key].text = text;
            data[key] = text;
        }
    }

    checkKey();

    if (res.error == true) {
        return res;
    } else {
        checkValues();
    }

    if (res.error != true) {
        atribuir(false, "Campos padronizados.", data);
    }

    return res;
}

window.checkInputs = checkInputs;
