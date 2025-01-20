// Tamanho da tela

function screenSize() {
    let width = window.innerWidth;

    if (width <= 768) {
        return 1; // Celular
    }

    return 4; // Computador
}

window.screenSize = screenSize;
