const PORT = process.env.PORT;
const IP = process.env.IP;
const url = {
    local: `http://localhost:${PORT}`,
    base:`http://${IP}:${PORT}`
};
const urlCors = [
    url.local,
    url.base
];

module.exports =  { urlCors, PORT };