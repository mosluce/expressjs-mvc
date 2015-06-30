var util = require('util');
var env = process.env['NODE_ENV'] || 'development';
var config = require('../configs/database')[env] || {};

var path = require('path');
var multer = require('multer');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

module.exports = function (app) {

    //JSON
    app.use(require('./json'));

    //DATABASE
    app.use(require('./database'));

    //FORM-DATA SUPPORTING
    app.use(multer({dest: path.join(__dirname, '..', 'uploads')}));

    //SESSION
    app.use(session({
        secret: 'akjljCJklcscljsoizU@E))CJwdjwiohsdichsklhakjxgckshbxbibiudwhijBJKBKCwigcis',
        store: new MongoStore({
            url: util.format("mongodb://%s/%s", config.host || 'localhost', config.database || 'test')
        }),
        resave: false,
        saveUninitialized: false
    }));

    //ROUTERS
    app.use('/', require('../app/controllers'));
};