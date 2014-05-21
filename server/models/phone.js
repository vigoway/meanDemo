'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Phone Schema
 */
var PhoneSchema = new Schema({
    additionalFeatures: String,
    android: Schema.Types.Mixed, 
    availability: Array, 
    battery: Schema.Types.Mixed, 
    camera: Schema.Types.Mixed, 
    connectivity: Schema.Types.Mixed, 
    description: String,
    display: Schema.Types.Mixed, 
    hardware: Schema.Types.Mixed, 
    id: String, 
    images: Array, 
    name: String, 
    sizeAndWeight: Schema.Types.Mixed, 
    storage: Schema.Types.Mixed
});


/**
 * Statics
 */
PhoneSchema.statics.load = function(id, cb) {
    this.findOne({
        id: id
    }).exec(cb);
};

mongoose.model('Phone', PhoneSchema);
