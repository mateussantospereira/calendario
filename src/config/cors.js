const cors = require("cors");
const { urlCors } = require("../config/url");
const Cors = cors({ origin: urlCors, methods: "GET,POST,PUT,DELETE" });

module.exports = { Cors };