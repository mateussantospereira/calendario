require("dotenv").config();
const express = require("express");
const app = express();
const { PORT } = require("./src/config/url");
const config = require("./src/config/config");

config(app, express);

app.listen(PORT, (error) => {
    if (error) { console.error("Erro"); }

    console.log(`Calendário na porta ${PORT}`);
});