var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var db;
var password = "bjarne";
var APP_PATH = path.join(__dirname, 'dist');



app.set('port', (process.env.PORT || 3000));
app.use('/', express.static(APP_PATH));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
  // Set permissive CORS header - this allows this server to be used only as
  // an API server in conjunction with something like webpack-dev-server.
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Disable caching so we'll always get the latest comments.
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.get('/api/jobs', function(req, res) {
  db.collection("job").find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    res.json(docs);
  });
});


//get a list of all the businesses
app.get('/api/business', function(req, res) {
  db.collection("business").find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    res.json(docs);
  });
});


//add a business
app.put('/api/business', function(req, res) {
  db.collection("business").insertOne({name: req.body.name, owner: req.body.owner, service: req.body.service, email: req.body.email, address: req.body.address, phone: req.body.phone}, function(err, result){
    if (err) throw err;
    res.json(200);
  });
})



//insert a new volunteer
app.put('/api/volunteer', function(req, res) {
  db.collection("volunteers").insertOne({id: req.body.emailPrefix, name: req.body.volunteerName, phone: req.body.phone}, function(err, result){
console.log(req.body.emailPrefix);//logging output for debugging purposes
console.log(req.body.volunteerName);

    if (err) throw err;
    res.json(200);
  });
})

app.use('*', express.static(APP_PATH));

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});

MongoClient.connect('mongodb://cs336:' + password + '@ds111788.mlab.com:11788/duttonportal', function (err, dbConnection) {
  if (err) { throw err; }
  db = dbConnection;
});
