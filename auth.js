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
            var m = request.server.plugins.mysql_connect.db.sequelize.models;
            m.vtiger_users.findById(decoded.user.id).then(function(user) {
                if (user == null) {
                    return callback(null, false);
                } else {
                    return callback(null, true);
                }
            })

        }
    });

    // Uncomment this to apply default auth to all routes
    next();
};

exports.register.attributes = {
    name: 'auth'
};
