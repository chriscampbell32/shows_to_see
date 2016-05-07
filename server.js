var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

//connects to mongodb on modulus.io =====
 mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu');  

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());

//define model =====

var Todo = mongoose.model('Todo',{
    text : String
});

//routes =====

app.get('/api/todos', function(req, res){
    Todo.find(function(err, todos){
        if (err)
            res.send(err)
        res.json(todos);
    });
});

app.post('/api/todos', function(req, res){
    Todo.create({
        text: req.body.text,
        done: false
    }, function(err, todo){
        if (err)
            res.send(err);

        Todo.find(function(err, todos){
            if(err)
                res.send(err)
            res.json(todos);
        });
    
    });
});

app.delete('/api/todos/:todo_id', function(req, res){
    Todo.remove({
        _id : req.params.todo_id
    }, function(err, todo){
        if(err)
            res.send(err);

        Todo.find(function(err, todos){
            if(err)
                res.send(err)
            res.json(todos);
        });
    
    });
});



app.listen(8080);
console.log("app listeninig on port 8080");

