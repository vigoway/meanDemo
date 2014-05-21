'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Order = mongoose.model('Order'),
    _ = require('lodash');


/**
 * Find order by id
 */
exports.order = function(req, res, next, id) {
    Order.load(id, function(err, order) {
        if (err) return next(err);
        if (!order) return next(new Error('Failed to load order ' + id));
        req.order = order;
        next();
    });
};



/**
 * Create an order
 */
exports.create = function(req, res) {
    var order = new Order(req.body);
    order.user = req.user;
    order.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                order: order
            });
        } else {
            res.jsonp(order);
        }
    });
};

/**
 * Update an order
 */
exports.update = function(req, res) {
    var order = req.order;

    order = _.extend(order, req.body);

    order.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                order: order
            });
        } else {
            res.jsonp(order);
        }
    });
};

/**
 * Delete an order
 */
exports.destroy = function(req, res) {
    var order = req.order;

    order.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                order: order
            });
        } else {
            res.jsonp(order);
        }
    });
};

/**
 * Show an order
 */
exports.show = function(req, res) {
    res.jsonp(req.order);
};


/**
 * List of Orders
 */
exports.all = function(req, res) {
    Order.find().sort('-created').populate('user', 'name username').exec(function(err, orders) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(orders);
        }
    });
};



