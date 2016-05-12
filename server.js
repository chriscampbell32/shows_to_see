var express = require('express');
var mongoose = require('mongoose');
// var database = require('./config/database');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var app = express();
var port = process.env.PORT || 8080;
//connects to mongodb on modulus.io =====
mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());

//routes =====

require('./app/routes')(app);


app.listen(port, function(){
  console.log("app listeninig on port " + port);
});

