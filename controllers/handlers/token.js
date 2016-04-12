const config = require('../../config/config');
const JWT = require('jsonwebtoken');
const Boom = require('boom');

module.exports.getToken = {
    handler: function(request, reply) {

        var m = request.server.plugins.mysql_connect.db.sequelize.models;

        m.vtiger_users.findById(request.params.id).then(function(user) {
            if (user != null) {
                var token = JWT.sign(user.dataValues, config.secret_key, {
                    expiresIn: 5 // expires in 24 seconds
                });
                return reply(token);
            } else
                return reply(Boom.unauthorized('invalid credentials'));
        });


    }
};

module.exports.checkToken = {
    auth: 'jwt',
    handler: function(request, reply) {
        
        return reply(request.auth.credentials.id);
       
    }
}