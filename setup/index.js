module.exports = function (app) {

    //JSON
    app.use(require('./json'));

    //DATABASE
    app.use(require('./database'));

    //ROUTERS
    app.use('/', require('../app/controllers'));
};