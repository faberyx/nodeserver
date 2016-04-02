var Sequelize = require('sequelize');
var sqlizr = require('sqlizr');


exports.register = (plugin, options, next) => {


    // default directory for models
    options.models = options.models || './models/*.js';
    var sequelize = new Sequelize('webdata', 'root', 'asdasd', {
        host: '91.205.173.98',
        dialect: 'mysql',

        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        define: {
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
        });

    
};

exports.register.attributes = {
    name: 'dbsql'
};