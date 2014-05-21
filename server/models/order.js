'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Phone Schema
 */
var OrderSchema = new Schema({
    products: Array,
    total: Number, 
    shipped2: String, 
    date: String,
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});


/**
 * Statics
 */
OrderSchema.statics.load = function(id, cb) {
    this.findOne({
        id: id
    }).exec(cb);
};

mongoose.model('Order', OrderSchema);
