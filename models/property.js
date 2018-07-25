// Property Model
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PropertySchema = new Schema(
  {
    name: {
    	type: String,
    	required: true,
    	max: 200
    },
    publisher: {
    	type: Schema.Types.ObjectId,
    	ref: 'Publisher',
    	required: true
    },
    desc: {
    	type: String,
    	required: true,
    	max: 300
    },
    address: {
    	type: String,
    	required: true,
    	max: 200
    },
    refnum: Number,
    city: String,
    props: {
    	bedroom: Number,
    	bathroom: Number
    },
    photos: {
    	main:  String,
    	more: Array 
    },
    created_at: {
    	type: Date,
        default: Date.now
    },
    updated_at: Date,
  }
);

// Virtual for property's URL
PropertySchema
.virtual('url')
.get(function () {
  return '/catalog/property/' + this._id;
});

//Export model
module.exports = mongoose.model('Property', PropertySchema);