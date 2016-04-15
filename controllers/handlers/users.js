'use strict'

const Joi = require('joi');

module.exports.read = {
    description: 'Get a list of all users',
    notes: 'Get a list of all vtiger users on the table',
    tags: ['api','users'],
    handler: function(request, reply) {

        const m = request.server.plugins.mysql_connect.db.sequelize.models;
        m.vtiger_users.all().then(function(users) {
            return reply(users);
        })

    }
};

module.exports.find = {
    description: 'Find a single user by id',
    notes: 'Find a single user passing the id parameter',
    tags: ['api','users'],
    validate: {
        params: {
            id: Joi.number().integer().description('user id'),
        }
    },
    handler: function(request, reply) {

        const m = request.server.plugins.mysql_connect.db.sequelize.models;
        m.vtiger_users.findById(req.params.id).then(function(user) {
            return reply(user);
        })

    }
};

module.exports.create = {
   // auth: 'jwt',
    description: 'Create a new user',
    notes: 'Create a new user on the table',
    tags: ['api','users'],
    validate: {
        payload: {
            user_name: Joi.string().min(1).max(256).description('username'),
            user_password: Joi.string().min(1).max(256).description('password'),
            user_hash: Joi.string().description('password hash'),
            cal_color: Joi.string().description('user color'),
            first_name: Joi.string().description('first name'),
            last_name: Joi.string().description('last name'),
        }
    },
    handler: function(request, reply) {
        
        const m = request.server.plugins.mysql_connect.db.sequelize.models;
        m.vtiger_users.create({ 
            user_name: request.payload.user_name,
            user_password: request.payload.user_password,
            user_hash: request.payload.user_hash,
            cal_color: request.payload.cal_color,
            first_name: request.payload.first_name,
            last_name:request.payload.last_name
         }).then(function(user) {
            reply(user).created('/users/' + user.id ); 
        }).catch(function(error) {
            return reply(Boom.badImplementation(error));
        });
    }
}

module.exports.update = {
   // auth: 'jwt',
    description: 'Update an existing user',
    notes: 'Update an existing user values',
    tags: ['api','users'],
    validate: {
        payload: {
            user_name: Joi.string().min(1).max(256).description('username'),
            user_password: Joi.string().min(1).max(256).description('password'),
            user_hash: Joi.string().description('password hash'),
            cal_color: Joi.string().description('user color'),
            first_name: Joi.string().description('first name'),
            last_name: Joi.string().description('last name'),
        }
    },
    handler: function(request, reply) {
        
        const m = request.server.plugins.mysql_connect.db.sequelize.models;

        m.vtiger_users.findById(request.params.id).then(function(user) {
            if(user)
                user.update({ 
                    user_name: request.payload.user_name,
                    user_password: request.payload.user_password,
                    user_hash: request.payload.user_hash,
                    cal_color: request.payload.cal_color,
                    first_name: request.payload.first_name,
                    last_name:request.payload.last_name
                }).then(function(newuser) {
                    return reply().code(200); 
                }).catch(function(error) {
                    return reply(Boom.badImplementation(error));
                });   
            else
                return reply(Boom.notFound());
        });
        
       
    }
}

module.exports.delete = {
   // auth: 'jwt',
    description: 'Delete a user by id',
    notes: 'Delete a user passing the id parameter',
    tags: ['api','users'],
    validate: {
        params: {
            id: Joi.number().integer().description('user id'),
        }
    },
    handler: function(request, reply) {
         
        const m = request.server.plugins.mysql_connect.db.sequelize.models;

        m.vtiger_users.findById(request.params.id).then(function(user) {
            if(user)
                user.destroy().then(function() {
                    return reply().code(200); 
                }).catch(function(error) {
                    return reply(Boom.badImplementation(error));
                });   
            else
                return reply(Boom.notFound());
        });
    }
}
