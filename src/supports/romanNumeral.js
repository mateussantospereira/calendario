// Algarismo Romano

function romanNumeral(arabico) {
    class decimal {
        constructor(ordem, content) {
            this.quantidade = (arabico % Math.pow(10, ordem) - arabico % Math.pow(10, ordem - 1)) / Math.pow(10, ordem - 1);
            this.content = content;
        }
    }

    let ordens = [
        new decimal(7, ["M̅"]),
        new decimal(6, ["C̅", "D̅", "M̅"]),
        new decimal(5, ["X̅", "L̅", "C̅"]),
        new decimal(4, ["M", "I̅", "V̅", "X̅"]),
        new decimal(3, ["C", "D", "M"]),
        new decimal(2, ["X", "L", "C"]),
        new decimal(1, ["I", "V", "X"]),
    ];

    let algarismoRomano = "";

    ordens.forEach((ordem) => {
        function write(vezes, text) {
            for (let count = 0; count < vezes; count++) {
                algarismoRomano = algarismoRomano + text;
            }
        }

        function postWritten(vezes, number) {
            if (ordem.content.length == 4) {
                write(vezes, `${ordem.content[number + 1]}`);
            } else {
                write(vezes, `${ordem.content[number]}`);
            }
        }

        if (ordem.quantidade == 4) {
            postWritten(1, 0);
            postWritten(1, 1);
        } else if (ordem.quantidade == 9) {
            postWritten(1, 0);
            postWritten(1, 2);
        } else if (ordem.quantidade >= 5) {
            let rest = ordem.quantidade - 5;
            postWritten(1, 1);
            postWritten(rest, 0);
        } else {
            write(ordem.quantidade, ordem.content[0]);
        }
    });

    return algarismoRomano;
}

module.exports = romanNumeral;