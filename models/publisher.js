// Publisher Model

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PublisherSchema = new Schema(
  {
    name: {type: String, required: true, max: 200},
    phone: {type: String, required: true, max: 20},
    created_at: {type: Date},
    last_login: {type: Date},
  }
);

// Virtual for publisher's URL
PublisherSchema
.virtual('url')
.get(function () {
  return '/catalog/publisher/' + this._id;
});

//Export model
module.exports = mongoose.model('Publisher', PublisherSchema);