var express = require('express');
var app = express();
var path = require('path');

var bodyParser = require("body-parser");
var compression = require('compression');
var cookieParser = require('cookie-parser');

class App{
    constructor() {
        app.use(compression({filter: function (req, res, next) {
            if (req.headers['x-no-compression']) {
                return false
            }
            return compression.filter(req, res)
        }}));
        app.use(bodyParser.json({
            limit: '50mb'
        }));
        app.use(cookieParser())
        app.use(bodyParser.urlencoded({
            extended: true,
            parameterLimit: 1000000,
            limit: '50mb'
        }));
        app.set('views', path.join(__dirname, 'views'));
        app.get('/', function (req, res, next) {
            res.send('Hello World!');
        });
        app.use(function (err, req, res, next) {
            if (res['_headersSent']) {
                //do nothing
            }
            else {
                res.status(500).send('Something broke!');

            }
        });

        var port = 8080;

        app.listen(port, function() {
            console.log('Example app listening on port ' + port);
        })
    }
}
new App();