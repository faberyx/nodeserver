exports.register = (plugin, options, next) => {

  plugin.dependency('controllers');

  var handlers = plugin.plugins.controllers.handlers;

  plugin.route([
    // Application Routes
    { method: 'GET', path: '/{path*}',      config: handlers.Home.notFound },
    { method: 'GET', path: '/',             config: handlers.Home.hello },
    { method: 'GET', path: '/restricted',   config: handlers.Home.restricted },
    { method: 'GET', path: '/login/{id}',   config: handlers.Login.login },
    { method: 'GET', path: '/users',        config: handlers.Users.list },
  ]);

  next();
};

exports.register.attributes = {
  name: 'routes'
};