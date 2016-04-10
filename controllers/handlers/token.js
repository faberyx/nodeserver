const secret_key = require('../../config/config');
const JWT = require('jsonwebtoken');
const Boom = require('boom');

module.exports.getToken = {
    handler: function(request, reply) {

        var m = request.server.plugins.mysql_connect.db.sequelize.models;

        m.User.findById(request.params.id).then(function(user) {
            if (user != null) {
                var token = JWT.sign(user.dataValues, config.secret_key);
                return reply(token);
            } else
                return reply(Boom.unauthorized('invalid credentials'));
        });


    }
};

module.exports.checkToken = {
    auth: 'jwt',
    handler: function(request, reply) {
        
        return reply('ok');
       
    }
}