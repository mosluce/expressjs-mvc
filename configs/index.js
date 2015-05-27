module.exports = function (app) {

    //JSON
    app.use(require('./json'));

    //DATABASE
    app.use(require('./database')(app));

    //ROUTERS
    app.use('/api', require('../app/controllers/api'));
    app.use('/', require('../app/controllers/web'));
};