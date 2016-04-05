const secret_key = require('../../config/config');
const JWT   = require('jsonwebtoken');
const Boom = require('boom');

module.exports.login = {
  handler: function (request, reply) {
      
    var m =   request.server.plugins.dbsql.db.sequelize.models;
      
    m.User.findById(request.params.id).then(function(user) {
        if(user != null){
            var token = JWT.sign(user.dataValues, config.secret_key);
            return reply({ result: token });
        }else
            return reply(Boom.unauthorized('invalid credentials'));    
    });
    
    
  }
};