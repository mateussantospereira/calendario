// Response

function response(status, error, message, data = null) {
    return { status: status, error: error, message: message, data: data };
}
