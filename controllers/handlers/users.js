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
        m.vtiger_users.then(function(user) {
            return reply(user);
        })

    }
};

module.exports.create = {
   // auth: 'jwt',
    handler: function(request, reply) {
        
        var m = request.server.plugins.mysql.db.sequelize.models;
        Task.create({ 
            user_name: request.params.user_name,
            user_password: request.params.user_password,
            user_hash: request.params.user_hash,
            cal_color: request.params.cal_color,
            first_name: request.params.first_name,
            last_name:request.params.last_name
         }).then(function(user) {
            reply(user).created('/users/' + user.id ); 
        })
    }
}

module.exports.update = {
   // auth: 'jwt',
    handler: function(request, reply) {
        return reply({ result: 'Restricted!' });
    }
}

module.exports.delete = {
   // auth: 'jwt',
    handler: function(request, reply) {
        return reply({ result: 'Restricted!' });
    }
}