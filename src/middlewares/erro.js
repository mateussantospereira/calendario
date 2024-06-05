const resolver = (handLerFn) => {
    return (req, res, next) => {
        return Promise.resolve(handLerFn(req, res, next))
            .catch((e) => next(e));
    }
}

const error = (error, req, res, next) => {
    if (error) {
        console.log(error.stack);
        res.status(500).send(error.message);
    }
};


module.exports = { resolver, error };