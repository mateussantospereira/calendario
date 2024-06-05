const path = require("path");

const renderizar = (res, body) => {
    res.render("index", { body: body });
}

class viewController {
    inicio(req, res) {
        res.redirect("/calendario");
    }

    calendario(req, res) {
        renderizar(res, { body: 'calendario' });
    }

    info(req, res) {
        renderizar(res, { body: 'info' });
    }

    read(req, res) {
        res.sendFile(path.join(__dirname, "../../README.md"));
    }

    erro(req, res) {
        renderizar(res, { body: 'erro' });
    }
}

module.exports = new viewController;