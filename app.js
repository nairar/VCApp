var express = require('express');

var http = require('http');
var router = require('./routes');
var login = require('./routes/login');


var jade = require('jade');
var port = 8002;

var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', jade);
app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));

login.startServer(app, port);

