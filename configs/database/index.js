/**
 * Created by mosluce on 15/5/27.
 */
var Waterline = require('waterline');
var mongoAdapter = require('sails-mongo');
var fs = require('fs');
var path = require('path');
var _ = require('underscore');

var config = {
    adapters: {
        mongo: mongoAdapter
    },
    connections: {
        mongodb: {
            adapter: 'mongo',
            host: 'localhost',
            database: 'klcc-cloud-apps-db'
        }
    },
    defaults: {}
};

module.exports = function (req, res, next) {
    var orm = new Waterline();

    var modelDir = path.join(__dirname, '..', '..', 'app', 'models');

    var files = fs.readdirSync(modelDir);

    for (var i in files) {
        var modelName = files[i].replace(/\.js$/, '');
        var modelAttr = require(path.join(modelDir, modelName));
        var model = Waterline.Collection.extend(_.extend({
            identity: modelName,
            connection: 'mongodb'
        }, modelAttr));
        orm.loadCollection(model);
    }

    orm.initialize(config, function (err, models) {
        if (err) return res.e(err);

        req.models = models.collections;

        next();
    });
};