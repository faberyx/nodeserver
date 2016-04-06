'use strict';

exports.register = (plugin, options, next) => {

    plugin.dependency('controllers');

    var handlers = plugin.plugins.controllers.handlers;

    plugin.route([
        // Application Routes
      
        { method: 'POST', path: '/', config: handlers.Default.test },
        { method: 'GET', path: '/token/get/{id}', config: handlers.Token.getToken },
        //users
        { method: 'POST', path: '/users', config: handlers.Users.create },
        { method: 'GET', path: '/users', config: handlers.Users.read },
        { method: 'GET', path: '/users/{id}', config: handlers.Users.find },
        { method: 'PUT', path: '/users/{id}', config: handlers.Users.update },
        { method: 'DELETE', path: '/users/{id}', config: handlers.Users.delete },
        
        { method: 'GET', path: '/{path*}', config: handlers.Default.notFound },
    ]);

    next();
};

exports.register.attributes = {
    name: 'routes'
};