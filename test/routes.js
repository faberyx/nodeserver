// Load modules

const Code = require('code');
const Lab = require('lab');

const Glue = require('glue');
const manifest = require('../config/manifest.json');

// Test shortcuts

const lab = exports.lab = Lab.script();

// Tests
Glue.compose(manifest, { relativeTo: process.cwd() }, (err, server) => {
  server.start(() => { });

  lab.describe("Routes", () => {

    

    lab.it('Login to vtiger and return a valid token', done => {
      var options_getToken = {
        method : 'POST',
        url : '/token/get',
        payload : { "username":"test", "password":"asdasd"}
      };
       var options_checkToken = {
        method : 'GET',
        url : '/token/check',
      };
      server.inject(options_getToken, response => {
          
            Code.expect(response.statusCode).to.equal(200);
            
            var headers = {
            'Authorization' : response.payload,
            'Content-Type' : 'application/json; charset=utf-8'
            };
            
            options_checkToken.headers = headers;
            
            server.inject(options_getToken, response => {
            
          
                Code.expect(response.statusCode).to.equal(200);
               
            });
            
            done();
      });
    });
 
    lab.it('Unknown route should return http status 404', done => {
      server.inject('/unkownroute', response => {
        Code.expect(response.statusCode).to.equal(404);
        done();
      });
    });
  });
});
