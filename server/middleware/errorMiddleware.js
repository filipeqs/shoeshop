const { GeneralError } = require('../utils/errors');

const errorHandler = (err, req, res, next) => {
    console.log(err.message.white.bgRed);

    if (err instanceof GeneralError) {
        return res.status(err.getCode()).json({
            error: err.message,
        });
    }

    return res.status(500).json({
        error: err.message,
    });
};

module.exports = errorHandler;
