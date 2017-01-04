 
module.exports.notFound = {
    description: 'Page not found 404',
    tags: ['api'],
    handler: function(request, reply) {
        return reply({ result: '404' }).code(404);
    }
};
