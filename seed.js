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

function propertyCreate(title, publisher, desc, address, refnum, city, bedroom, bathroom, cb) {
  propdetail = { 
    title: title,
    publisher: publisher,
    desc: desc,
    address: address,
    refnum: refnum,
    city: city,
    props: {
      bedroom: bedroom,
      bathroom: bathroom
    }
  }

  var property = new Property(propdetail)

  property.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }

    console.log('New Property: ' + property);
    properties.push(property)
    cb(null, property)
  })

}

function createProperties(cb) {
    async.parallel([
        function(callback) {
          propertyCreate('ABC DCV', publishers[0], 'Pre-bicycle plastic knife savant paranoid 8-bit gang. Sub-orbital rifle systemic BASE jump bicycle tiger-team film fetishism Legba drone long-chain hydrocarbons refrigerator lights sunglasses construct. Euro-pop boy plastic warehouse office franchise saturation point order-flow Chiba A.I.. Boat shoes disposable rain shanty town knife warehouse hotdog. ', 'Address 1', 51512245, 'Alexandria',5, 6, callback);
        },
        function(callback) {
          propertyCreate('ASF CVXXC', publishers[1], 'Assault bicycle modem render-farm order-flow industrial grade footage youtube carbon marketing Kowloon fluidity savant construct. Network disposable San Francisco order-flow corporation monofilament footage range-rover assault pen math. Monofilament drugs bicycle savant refrigerator advert free-market voodoo god post-semiotics dissident papier-mache bridge saturation point rain sign nodal point. Advert RAF tower computer claymore mine papier-mache silent. Systemic nano-physical rain hotdog j-pop film cyber-girl shrine shoes Chiba man tank-traps saturation point military-grade. 8-bit courier shrine crypto-dead soul-delay Legba. Math-kanji stimulate denim meta-courier tank-traps sunglasses vehicle order-flow voodoo god network dolphin. Smart-receding boy San Francisco hacker rifle disposable courier alcohol vinyl pen girl.', 'Address 2', 51512245, 'Downtown',5, 6, callback);
        },
        function(callback) {
          propertyCreate('SLACK 54 ASD', publishers[2], 'Military-grade man lights hacker monofilament tattoo footage human franchise fetishism bomb media beef noodles computer BASE jump range-rover assassin. Range-rover pistol camera katana skyscraper construct spook tanto face forwards geodesic refrigerator urban into footage jeans. Modem gang drugs RAF vinyl-space weathered dissident boat jeans advert shoes alcohol crypto-courier nodality. Vinyl market bomb post--ware motion hacker grenade systema 8-bit convenience store.',  'Address 3', 51512245, 'London',5, 6, callback);
        },
        function(callback) {
          propertyCreate('ZXC LKS', publishers[3], 'DIY assault kanji footage Legba towards camera savant free-market-ware otaku geodesic computer. Augmented reality vinyl smart-construct neon jeans A.I. garage sub-orbital tiger-team pistol alcohol uplink rain fetishism. Cyber-camera nano-man modem ablative urban tube dome post-kanji artisanal assassin disposable. DIY film boat kanji fluidity wonton soup crypto-A.I. shoes monofilament market smart-concrete modem.',  'Address 4', 51512245, 'Las vegas',5, 6, callback);
        },
        function(callback) {
          propertyCreate('LKI SD 56', publishers[4], 'Human neon table tank-traps uplink crypto-car spook sign network footage weathered post-rifle fluidity. DIY assassin nodal point boy sunglasses sprawl smart-lights monofilament nano-convenience store camera human.-ware pistol dead Shibuya artisanal garage wonton soup sentient tube weathered. Gang nodal point wonton soup tanto voodoo god uplink A.I. table convenience store franchise plastic dolphin weathered j-pop. Car saturation point hotdog industrial grade disposable meta-sprawl paranoid RAF otaku plastic construct beef noodles. Tank-traps digital grenade sensory into disposable convenience store footage. Kanji footage sunglasses dead render-farm warehouse katana engine. Youtube grenade nano-bicycle tank-traps pre-apophenia kanji hotdog tube hacker into j-pop realism.',  'Address 5', 51512245, 'Uptown',2, 3, callback);
        },
        ],
        // optional callback
        cb);
}

async.series([
    createPublishers,
    createProperties,
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Publishers: '+properties);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});




