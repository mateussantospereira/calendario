let especiais = ['!', '@', '#', '$', '%', '&', '*', '(', ')', '_', '+', '=', '§', '[', '{', 'ª', '}', ']', 'º', '/', '?', '°', ';', ':', '.', ',', '>', '<', "|", '£', '¢', '¬'];
let acentos = ['"', "'", "`", "´", '¨', '^', '~',]
let numeros = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

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

            if (fields[key].date) {
                if (fields[key].date == true) {
                    if (text.includes("-") && text.split("-").length == 3) {
                        let date = text.split("-")
                        if (
                            date[0].length != 4 ||
                            Number(date[0]) < 1942 ||
                            date[1].length != 2 ||
                            Number(date[1]) < 1 || Number(date[1]) > 12 ||
                            date[2].length != 2 ||
                            Number(date[2]) < 1 || Number(date[2]) > 31
                        ) {
                            atribuir(true, `Erro. O campo ${fields[key].nome} deve ser uma data válida.`);
                            break;
                        }
                    } else {
                        atribuir(true, `Erro. O campo ${fields[key].nome} deve ser uma data válida.`);
                        break;
                    }
                }

                if (fields[key].date == "formatar") {
                    if (text.includes(".") && text.split(".").length == 3) {
                        let date = text.split(".");
                        if (
                            date[0].length != 2 ||
                            Number(date[0]) < 1 || Number(date[0]) > 31 ||
                            date[1].length != 2 ||
                            Number(date[1]) < 1 || Number(date[1]) > 12 ||
                            date[2].length != 4 ||
                            Number(date[2]) < 1942
                        ) {
                            atribuir(true, `Erro. O campo ${fields[key].nome} deve ser uma data válida.`);
                            break;
                        } else {
                            text = `${date[2]}-${date[1]}-${date[0]}`;
                        }
                    } else {
                        atribuir(true, `Erro. O campo ${fields[key].nome} deve ser uma data válida.`);
                        break;
                    }
                }
            }

            if (fields[key].list) {
                if (fields[key].list == true) {
                    if (text.includes(",")) {
                        let list = text.split(",");
                        let errorMessage;

                        if (list.length < 1) {
                            atribuir(true, `Erro. ${fields[key].nome} vazia.`);
                            break;
                        }

                        if (list.length > fields[key].max) {
                            atribuir(true, `Erro. A ${fields[key].nome} ultrapassou o limite de ${fields[key].max} caracteres.`);
                            break;
                        }

                        for (let number of list) {
                            if (typeof(Number(number)) != "number") {
                                errorMessage = "Erro. Envie apenas números na lista.";
                            }

                            if (errorMessage != undefined) {
                                break;
                            }
                        }

                        if (errorMessage != undefined) {
                            atribuir(true, errorMessage);
                            break;
                        }

                        data[key] = list;
                        break;
                    } else {
                        atribuir(true, `Erro. ${fields[key].nome} vazia.`);
                        break;
                    }
                }
            }

            if (fields[key].null) {
                if (fields[key].null == true) {
                    if (text == "") {
                        text = "";
                    };
                } else {
                    if (text == undefined || text == "") {
                        textUndefined();
                        break;
                    }
                }
            } else {
                if (text == undefined || text == "") {
                    textUndefined();
                    break;
                }
            }

            if (fields[key].obg) {
                let error;

                fields[key].obg.forEach((o) => {
                    if (!text.includes(o)) {
                        atribuir(true, `Erro. O campo ${fields[key].nome} deve incluir o caractere ${o}.`);
                        error = true;
                    }
                });

                if (error == true) {
                    break;
                }
            }

            if (fields[key].ndc) {
                if (fields[key].ndc.includes("especiais")) {
                    fields[key].ndc = fields[key].ndc.concat(especiais);
                }
                if (fields[key].ndc.includes("acentos")) {
                    fields[key].ndc = fields[key].ndc.concat(acentos);
                }

                if (fields[key].ndc.includes("numeros")) {
                    fields[key].ndc = fields[key].ndc.concat(numeros);
                }
            }

            if (fields[key].ndc) {
                let error;

                fields[key].ndc.forEach((n) => {
                    if (fields[key].obg) {
                        if (text.includes(n) && !fields[key].obg.includes(n)) {
                            atribuir(true, `Erro. O campo ${fields[key].nome} não deve incluir o caractere ${n}.`);
                            error = true;
                        };
                    } else {
                        if (text.includes(n)) {
                            atribuir(true, `Erro. O campo ${fields[key].nome} não deve incluir o caractere ${n}.`);
                            error = true;
                        }
                    };
                });

                if (error == true) {
                    break;
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

module.exports = checkInputs;