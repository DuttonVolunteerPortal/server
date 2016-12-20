/*
 * server.js runs the web server for the Dutton Christian School Volunteering Administrator View
 *    Created by: Ethan Clark, Ben Kastner, Mitch Stark, Kyle Reitsma
 *    Fall 2016 @ Calvin College
 *    CS 336 Final Project
 */

// Create variables from the Node requires/dependencies
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var db;
var json2csv = require('json2csv');
var APP_PATH = path.join(__dirname, 'dist');

/*
Handy CURL commands:
curl -X PUT http://localhost:3000/api/business -d '{"name" : "Kastner Konstruction", "owner" Kastner Family", "service" : "Konstruction - We make easy jobs look hard.", "email" : "me@somedomain.com", "address" : "8888 No Street Nowhere, MI 00000", "phone" : "444-444-4444" }' -H 'Content-Type: application/json'
*/

// Set the port and the app directory path
app.set('port', (process.env.PORT || 3000));
app.use('/', express.static(APP_PATH));

// Get access to use the JSON body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// Route to get all the jobs from the MongoDB collection
app.get('/api/jobs', function(req, res) {
  db.collection("job").find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    res.json(docs);
  });
});

// Route to add a new job to the MongoDB collection
app.post('/api/jobs', function(req, res) {
  var newJob = {
    id: Date.now(),
    title: req.body.volunteer_job,
    description: req.body.volunteer_description,
    workers: []
  };
  db.collection("job").insertOne(newJob, function(err, result) {
    if (err) throw err;
    db.collection("job").find({}).toArray(function(err, docs) {
      if (err) throw err;
      res.json(docs);
    });
  });
});

// Route to find a job by its ID number
app.get('/api/jobs/:id', function(req, res) {
  db.collection("job").find({"id": Number(req.params.id)}).toArray(function(err, docs) {
    if (err) throw err;
    res.json(docs);
  });
});

// Route to update a job by its ID number
app.put('/api/jobs/:id', function(req, res) {
  var updateId = Number(req.params.id);
  var update = req.body;
  db.collection('job').updateOne(
    { id: updateId },
    { $set: update },
    function(err, result) {
      if (err) throw err;
      db.collection("job").find({}).toArray(function(err, docs) {
        if (err) throw err;
        res.json(docs);
      });
    });
  });

// Route to delete a job by its ID number
app.delete('/api/jobs/:id/:title', function(req, res) {
  db.collection("volunteers").find({}).toArray(function(err, volunteers) {
    for (v of volunteers) {
      var index = v.jobsDesired.indexOf(req.params.title);
      if (index > -1) {
        v.jobsDesired.splice(index, 1);
      }
      db.collection("volunteers").updateOne({"name": v.name}, v);
    }
  });

  db.collection("job").deleteOne({'id': Number(req.params.id)}, function(err, result) {
      if (err) throw err;
      db.collection("job").find({}).toArray(function(err, docs) {
        if (err) throw err;
        res.json(docs);
      });
  });
});

//Route to remove a volunteer from a job
app.delete('/api/jobs/volunteer/:jobToRemove/:name', function(req, res) {
  db.collection("job").find({"title" : req.params.jobToRemove}).toArray(function(err, jobs) {
    //only one job to find
    for (job of jobs) {
      var index = job.workers.indexOf(req.params.name)
      if (index > -1) {
        job.workers.splice(index, 1);
      }
      db.collection("job").updateOne({"title" : job.title}, job)
    }
  });

  //now remove from the volunteer collection
  db.collection("volunteers").find({"name" : req.params.name}).toArray(function(err, volunteers) {
    for (v of volunteers) {
      var index = v.jobsDesired.indexOf(req.params.jobToRemove)
      if (index > -1) {
        v.jobsDesired.splice(index, 1);
      }
      db.collection("volunteers").updateOne({"name" : v.name}, v)
    }
  })
  res.json(200)
});

// Route to get all the businesses from the server
app.get('/api/business', function(req, res) {
  db.collection("business").find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    res.json(docs);
  });
});

/*
 * Route to get the list of contact information as a CSV file for all the people who signed up for a certain job
 * https://www.npmjs.com/package/json2csv
   found out about res.download() here from user Jossef Harush:  http://stackoverflow.com/questions/7288814/download-a-file-from-nodejs-server-using-express
 */
app.get('/api/export/specificJob/:jobName', function(req, res) {
  db.collection("volunteers").find({ jobsDesired: { $in: [req.params.jobName] } }).toArray(function(err, volunteers) {
    var fields = ['name','email'];
    var csv = json2csv({data: volunteers, fields: fields});
    fs.writeFile('specificJobOutput.csv', csv, function(err){
      if (err) throw err;
      console.log("Saved file");
      res.download('specificJobOutput.csv');
    });
  });
});

/*
 * Route to get the list of businesses as a CSV file
 * https://www.npmjs.com/package/json2csv
 */
 app.get('/api/export/businesses', function(req, res) {
  db.collection("business").find({}).toArray(function(err, businesses) {
    var fields = ['owner_name', 'email', 'businessDescription'];
    var csv = json2csv({data: businesses, fields: fields});
    fs.writeFile('BusinessOutput.csv', csv, function(err) {
      if (err) throw err;
      console.log("Saved file");
      res.download('BusinessOutput.csv');
    });
  });
 });

// Use * to get all bad urls and set it to the home page
app.use('*', express.static(APP_PATH));

// Show that the application is listening on localhost port 3000
app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});

// Get connection to the MongoDB where all the data is stored
MongoClient.connect('mongodb://cs336:' + process.env.PASSWORD + '@ds111788.mlab.com:11788/duttonportal', function (err, dbConnection) {
  if (err) { throw err; }
  db = dbConnection;
});
