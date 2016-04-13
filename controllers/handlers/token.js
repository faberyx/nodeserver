const config = require('../../config/config');
const JWT = require('jsonwebtoken');
const Boom = require('boom');
const Joi = require('joi');
const crypto = require('crypto');

module.exports.getToken = {
    validate: {
        payload: {
            username: Joi.string().min(1).max(256),
            password: Joi.string().min(1).max(256)
        }
    },
    handler: function(request, reply) {

        var m = request.server.plugins.mysql_connect.db.sequelize.models;

        var md5psw = crypto.createHash('md5').update(request.payload.password).digest("hex");
        
        m.vtiger_users.findOne({ where: {user_name: request.payload.username,user_hash: md5psw } }).then(function(user) {
            if (user != null) {
                var token = JWT.sign({user:user.dataValues}, config.secret_key, {
                    expiresIn: 120 // expires in 120 seconds
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
        
        return reply(request.auth.credentials.user.id);
       
    }
}
