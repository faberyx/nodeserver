'use strict';

var Sequelize = require('sequelize');
var sqlizr = require('sqlizr');
var config = require('./config/config');

exports.register = (plugin, options, next) => {

    // default directory for models
    options.models = options.models || './models/*.js';
    var sequelize = new Sequelize(config.db_schema, config.db_user, config.db_pass, {
        host: config.db_host,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        define: {
            freezeTableName: true,
            timestamps: false // true by default
        }

    });
    // test the database connection
    sequelize.authenticate()
        .then(function() {
            // import models
            sqlizr(sequelize, options.models);

            var db = {
                sequelize: sequelize,
                Sequelize: Sequelize
            };

            // make available in hapi application
            plugin.expose('db', db);
            return next();
        })
        .catch(function(err) {
            return next(err);
        })
        
        next();
};

exports.register.attributes = {
    name: 'mysql_connect'
};
