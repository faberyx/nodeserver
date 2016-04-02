module.exports.login = {
  handler: function (request, reply) {
      
    const secret_key = require('../../config/auth');
    const JWT   = require('jsonwebtoken');
    var obj   = { id:1,name:"Mike" }; // object/info you want to sign
    var token = JWT.sign(obj, secret_key);
      
    return reply({ result: token });
  }
};