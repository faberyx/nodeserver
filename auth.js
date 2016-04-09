'use strict'

var config = require('./config/config');

exports.register = function(plugin, options, next) {

    plugin.auth.strategy('jwt', 'jwt', {
        key: config.secret_key, // Secret key
        verifyOptions: {
            algorithms: ['HS256']
        },
        // Implement validation function
        validateFunc: (decoded, request, callback) => {
            var m = request.server.plugins.mysql.db.sequelize.models;
            m.vtiger_users.findById(decoded.id).then(function(user) {
                if (users == null) {
                    return callback(null, false);
                } else {
                    return callback(null, true);
                }
            })

        }
    });

    // Uncomment this to apply default auth to all routes
    //plugin.auth.default('jwt');

    next();
};

exports.register.attributes = {
    name: 'auth'
};