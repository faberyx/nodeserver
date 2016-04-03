 

module.exports.list = {
  handler: function (request, reply) {
      
    var m =   request.server.plugins.dbsql.db.sequelize.models;
      
    m.vtiger_users.all().then(function(users) {
     return reply({ users });
    })
    
  }
};