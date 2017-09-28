/**
 * Created by tha on 27-09-2017.
 */
var express = require('express');

var app = express();
var persons = ['Henrik', 'Hassan', 'Alma', 'Sarah', 'Helmuth', 'Sami', 'Xu-Ling', 'Odin'];

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Wellcome to the frontpage');
}).get('/subpage', function(req, res){
    res.setHeader('Content-Type', 'text/plain');
    res.send('Wellcome to the subpage');
}).get('/person/:id', function(req, res){
    res.setHeader('Content-Type', 'text/plain');
    res.send('The person with id: '+req.params.id+' is '+persons[req.params.id]);
}).use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Page cannot be found!');
});

app.listen(8000);