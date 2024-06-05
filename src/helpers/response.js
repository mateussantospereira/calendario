function response (res, status, error, message, data = null) {
    res.status(status).json({ status: status, error: error, message: message, data: data });
}

module.exports = response;