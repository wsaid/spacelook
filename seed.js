#! /usr/bin/env node

console.log('This script populates some test books, publishers and properties to your database. Specified database as argument - e.g.: populatedb mongodb://your_username:your_password@your_dabase_url');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

var async = require('async')

var Publisher = require('./models/publisher')
var Property = require('./models/property')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));


var publishers = []
var properties = []

function publisherCreate(name, phone, created_at, last_login, cb) {
  pubdetail = {name: name, phone: phone, created_at: created_at, last_login: last_login}

  var publisher = new Publisher(pubdetail)

  publisher.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }

    console.log('New Publisher: ' + publisher);
    publishers.push(publisher)
    cb(null, publisher)
  })

}

function createPublishers(cb) {
    async.parallel([
        function(callback) {
          publisherCreate('John Patrick', '3258323565', '2004-06-06', '2018-01-05', callback);
        },
        function(callback) {
          publisherCreate('Coffee Ben', '5484565465', '2001-11-8', '2017-08-10', callback);
        },
        function(callback) {
          publisherCreate('Smart Dowel', '6548654651', '2000-01-02', '2015-04-06', callback);
        },
        function(callback) {
          publisherCreate('Bob Sink', '544648684', '2005-05-12', '2012-05-12', callback);
        },
        function(callback) {
          publisherCreate('Jim Arnold', '5454654656', '2006-12-16', '2008-05-12', callback);
        },
        ],
        // optional callback
        cb);
}

async.series([
    createPublishers,
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Publishers: '+publishers);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});




