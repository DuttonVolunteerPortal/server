var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var db;
var spawnSync = require('child_process').spawnSync;
var APP_PATH = path.join(__dirname, 'dist');

/*
Handy CURL commands:
curl -X PUT http://localhost:3000/api/business -d '{"name" : "Kastner Konstruction", "owner" Kastner Family", "service" : "Konstruction - We make easy jobs look hard.", "email" : "me@somedomain.com", "address" : "8888 No Street Nowhere, MI 00000", "phone" : "444-444-4444" }' -H 'Content-Type: application/json'
*/

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


MongoClient.connect('mongodb://cs336:' + process.env.MONGO_PASSWORD + '@ds111788.mlab.com:11788/duttonportal', function (err, dbConnection) {
  if (err) { throw err; }
  db = dbConnection;
});


app.get('/api/jobs', function(req, res) {
  db.collection("job").find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    res.json(docs);
  });
});

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

app.get('/api/jobs/:id', function(req, res) {
     db.collection("job").find({"id": Number(req.params.id)}).toArray(function(err, docs) {
         if (err) throw err;
         res.json(docs);
    });
});

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

app.delete('/api/jobs/:id', function(req, res) {
     db.collection("job").deleteOne(
         {'id': Number(req.params.id)},
         function(err, result) {
             if (err) throw err;
             db.collection("job").find({}).toArray(function(err, docs) {
                 if (err) throw err;
                 res.json(docs);
             });
         });
});

//this removes a volunteer from a job
app.delete('/api/jobs/:jobToRemove/:name', function(req, res) {
  db.collection("job").find({"title" : req.params.jobToRemove}).toArray(function(err, jobs) {
    //only one job to find
    for (job of jobs) {
      var index = job.workers.indexOf(req.params.name)
      if (index > -1) {
        job.workers.splice(index, 1);
      }
      db.collection("job").updateOne({"title" : job.title}, job)
    }
  })
  res.json(200)
});

//get a list of all the businesses
app.get('/api/business', function(req, res) {
  db.collection("business").find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    res.json(docs);
  });
});

/* add or update a business
If the business (based on the name field) does not exist, it is created.
If the business already exists, all fields are changed to match the values give.
This means that even if you update one filed, you must send back the original values of all the other fields.
*/
app.put('/api/business', function(req, res) {
  db.collection("business").updateOne({name: req.body.name}, {name: req.body.name, owner: req.body.owner, service: req.body.service, email: req.body.email, address: req.body.address, phone: req.body.phone},{upsert: true}, function(err, result){
    console.log(req.body.name);//logging output for debugging purposes
    console.log(req.body.owner);
    console.log(req.body.phone);

    if (err) throw err;
    res.json(200);
  });
})

/*get the list of contact information as a CSV file for all the people who signed up for a certain job*/

/*code for spawning process here:    http://stackoverflow.com/questions/20176232/mongoexport-with-parameters-node-js-child-process, from user "Ben".
The code for piping into stdout at the end of the spawn command came from user robertklep
found out about res.download() here from user Jossef Harush:  http://stackoverflow.com/questions/7288814/download-a-file-from-nodejs-server-using-express

found out about writing to /tmp on heroku from here, users David S and Austin Pocus http://stackoverflow.com/questions/12416738/how-to-use-herokus-ephemeral-filesystem
COPIED CODE FOR CREATING A FOLDER from here, user Louis:  http://stackoverflow.com/questions/22664654/unable-to-read-a-saved-file-in-heroku


idea for using __dirname came from user loganfsmyth  http://stackoverflow.com/questions/13541948/node-js-cant-open-files-error-enoent-stat-path-to-file

*/


app.get('/api/export/specificJob/:jobName', function(req, res) {

// var exportDir = path.join(__dirname, '/exportTemp/');
if(!fs.existsSync('./temp')) {
  fs.mkdirSync('./temp');
}


// var filename = exportDir + 'specificJobOutput.csv';
// console.log(filename);

console.log("going to spawn process now");
// jobNameArray.push(req.params.jobName);
var queryString = '{ jobsDesired: { $in: ["'+ req.params.jobName +'"] } }';
var mongoExportVolunteersJob = spawnSync('mongoexport', ['-h', 'ds111788.mlab.com:11788',
 '--db', 'duttonportal', '-c', 'volunteers',
'-u', 'cs336', '-p', process.env.MONGO_PASSWORD, '-q', queryString, '--type=csv',
'--fields', 'name,email', '--out', './temp/specificJobOutput.csv']);
console.log('after spawn');
res.download('./temp/specificJobOutput.csv');//http://stackoverflow.com/questions/13541948/node-js-cant-open-files-error-enoent-stat-path-to-file, user AmirtharajCVijay
// res.send(mongoExportVolunteersJob);
// res.json(200);
});

app.use('*', express.static(APP_PATH));

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
