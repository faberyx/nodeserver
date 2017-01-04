'use strict';

const Glue = require('glue');
const Hapi = require('hapi');
const manifest = require('./config/manifest.json');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');


if (process.env.NODE_ENV!='production') {
    
    manifest.registrations.push(
        {
            "plugin": {
                "register": "blipp",
                "options": {}
            }
        },
        {
            "plugin": {
                "register": "good",
                "options": {
                    "opsInterval": 1000,
                    "reporters": [
                        {
                            "reporter": "good-console",
                            "events": {
                               "log" : "*"
                            }
                        }
                    ]
                }
            }
        }
    );
}


Glue.compose(manifest, { relativeTo: __dirname }, (err, server) => {
    
    if (err) {
        console.log('server.register err:', err);
    }
    
    const options = {
        info: {
            'title': 'Test API Documentation',
            'version': '0.0.1',
        }
    };
    
    server.register([
        Inert,
        Vision,
        {
            'register': HapiSwagger,
            'options': options
        }], (err) => {
            server.start( (err) => {
            if (err) {
                    console.log(err);
                } else {
                    console.log('✅  Server is listening on ' + server.info.uri.toLowerCase());
                }
            });
    });
 
});
