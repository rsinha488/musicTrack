require('./server/data/db.js');
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var routes = require('./server/routes');

// Defining the port 
app.set('port', 3000);

// Add middleware to console log every request
app.use(function(req, res, next){
    console.log(req.method, req.url);
    next();
});

// Set static directory before defining routes
app.use(express.static(path.join(__dirname, 'client')));


app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/fonts', express.static(__dirname + '/fonts'));

// Enable parsing of posted forms
app.use(bodyParser.urlencoded({ extendsed :false}));
app.use(bodyParser.json());

// Add some routing
app.use('/v1', routes);

// Listen for requests
var server = app.listen(app.get('port'),function(){
    var port =  server.address().port;
    console.log("Server is running at port "+ port);
});