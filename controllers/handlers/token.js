const config = require('../../config/config');
const JWT = require('jsonwebtoken');
const Boom = require('boom');
const Joi = require('joi');
const crypto = require('crypto');

 
module.exports.getToken = {
    description: 'Get the login JWT token using vtiger credentials',
    notes: 'Provide vtiger username and password to get the JWT token',
    tags: ['authentication', 'token'],
    validate: {
        payload: {
            username: Joi.string().min(1).max(256),
            password: Joi.string().min(1).max(256)
        }
    },
    handler: function(request, reply) {

        const m = request.server.plugins.mysql_connect.db.sequelize.models;

        const md5psw = crypto.createHash('md5').update(request.payload.password).digest("hex");
        
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
    description: 'Checks the validity of JWT token',
    notes: 'Pass the jwt token in the Authorization header to pass the authorization check',
    tags: ['authentication', 'token'],
    auth: 'jwt',
    handler: function(request, reply) {
        
        return reply(request.auth.credentials.user.id);
       
    }
}
