'use strict'

module.exports.read = {
    handler: function(request, reply) {

        var m = request.server.plugins.mysql.db.sequelize.models;
        m.vtiger_users.all().then(function(users) {
            return reply(users);
        })

    }
};

module.exports.find = {
    handler: function(request, reply) {

        var m = request.server.plugins.mysql.db.sequelize.models;
        m.vtiger_users.findById(req.params.id).then(function(user) {
            return reply(user);
        })

    }
};

module.exports.create = {
   // auth: 'jwt',
    handler: function(request, reply) {
        
        var m = request.server.plugins.mysql.db.sequelize.models;
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
    handler: function(request, reply) {
        
        var m = request.server.plugins.mysql.db.sequelize.models;

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
    handler: function(request, reply) {
         
        var m = request.server.plugins.mysql.db.sequelize.models;

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