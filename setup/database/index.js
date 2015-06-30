/**
 * Created by mosluce on 15/5/27.
 */
var fs = require('fs');
var path = require('path');

var util = require('util');

var _ = require('underscore');

var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var autopopulate = require('mongoose-autopopulate');
var Schema = mongoose.Schema;

var env = process.env['NODE_ENV'] || 'development';
var config = require('../../configs/database')[env];

module.exports = function (req, res, next) {
    var host = config.host || 'localhost';
    var database = config.database || 'test';

    //Mongoose Only
    var conn = mongoose.createConnection();

    conn.once('open', function () {
        var modelDir = path.join(__dirname, '..', '..', 'app', 'models');
        var modelFiles = fs.readdirSync(modelDir);

        for (var i in modelFiles) {
            var modelFile = modelFiles[i];

            if (/^\..*/.test(modelFile)) continue;

            var modelName = modelFiles[i].replace(/\.js$/, '');
            var schemaObj = require(path.join(modelDir, modelName))(Schema);

            if (schemaObj instanceof Array) {
                for (var i in schemaObj) {
                    var schema = schemaObj[i].schema;
                    var name = schemaObj[i].name;

                    schema.plugin(timestamps, {
                        updatedAt: 'updated',
                        createdAt: 'created'
                    });
                    schema.plugin(autopopulate);
                    conn.model(name, schema);
                }
            } else {
                schemaObj.plugin(timestamps);
                schemaObj.plugin(autopopulate);
                conn.model(modelName, schemaObj);
            }
        }

        req.models = conn.models;
        req.database = conn;

        next();
    });

    conn.on('err', res.e);

    res.on('finish', function () {
        conn.close();
    });

    res.on('close', function () {
        conn.close();
    });

    conn.open(util.format("mongodb://%s/%s", host, database));
};