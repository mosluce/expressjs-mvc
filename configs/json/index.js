module.exports = function (req, res, next) {
    res.s = function (data) {
        res.send({
            success: true,
            data: data
        });
    };

    res.f = function (message) {
        res.send({
            success: false,
            message: message
        });
    };

    res.e = function () {
        var status, error;

        if (arguments.length > 1) {
            status = arguments[0];
            error = arguments[1];
        } else {
            status = 500;
            error = arguments[0];
        }

        res.status(status).send({
            error: error,
            message: error.message
        });
    };

    next();
};