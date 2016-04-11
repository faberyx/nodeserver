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

    lab.it('Known route should return http status 200', done => {
      server.inject('/', response => {
        Code.expect(response.statusCode).to.equal(200);
        done();
      });
    });

    lab.it('Restricted route should return http status 200 for authenticated user', done => {
      var options = {
        method : 'GET',
        url : '/restricted',
        headers : {
          'Authorization' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwidXNlcl9uYW1lIjoiYWRtaW4iLCJ1c2VyX3Bhc3N3b3JkIjoiJDEkYWQwMDAwMDAkdzNHdlU3NEQ5RHJBc3BnY21GdUF1MCIsInVzZXJfaGFzaCI6ImQ0MWQ4Y2Q5OGYwMGIyMDRlOTgwMDk5OGVjZjg0MjdlIiwiY2FsX2NvbG9yIjoiI0U2RkFEOCIsImZpcnN0X25hbWUiOiJhZG1pbiIsImxhc3RfbmFtZSI6IkFkbWluaXN0cmF0b3IiLCJpYXQiOjE0NjA0MDg3NzZ9.pUWKcqco_FShCnol6Jjimr2ujU1wDliPqkSY0dEToJU',
          'Content-Type' : 'application/json; charset=utf-8'
        }
      };
      server.inject(options, response => {
        Code.expect(response.statusCode).to.equal(200);
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