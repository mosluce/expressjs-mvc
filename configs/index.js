module.exports = function (app) {

    //JSON
    app.use(require('./json'));

    //DATABASE
    if (app.db_inited) {
        app.db_inited = true;
        app.use(require('./database'));
    }

    //ROUTERS
    app.use('/api', require('../app/controllers/api'));
    app.use('/', require('../app/controllers/web'));
};