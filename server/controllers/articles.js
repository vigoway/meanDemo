'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Article = mongoose.model('Article'),
    Phone = mongoose.model('Phone'),
    _ = require('lodash');


/**
 * Find article by id
 */
exports.article = function(req, res, next, id) {
    Article.load(id, function(err, article) {
        if (err) return next(err);
        if (!article) return next(new Error('Failed to load article ' + id));
        req.article = article;
        next();
    });
};

/**
 * Find phone by id
 */

exports.phone = function(req, res, next, id) {
    Phone.load(id, function(err, phone) {
        if (err) return next(err);
        if (!phone) return next(new Error('Failed to load phone ' + id));
        req.phone = phone;
        next();
    });
};

/**
 * Create an article
 */
exports.create = function(req, res) {
    var article = new Article(req.body);
    article.user = req.user;

    article.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                article: article
            });
        } else {
            res.jsonp(article);
        }
    });
};

/**
 * Update an article
 */
exports.update = function(req, res) {
    var article = req.article;

    article = _.extend(article, req.body);

    article.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                article: article
            });
        } else {
            res.jsonp(article);
        }
    });
};

/**
 * Delete an article
 */
exports.destroy = function(req, res) {
    var article = req.article;

    article.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                article: article
            });
        } else {
            res.jsonp(article);
        }
    });
};

/**
 * Show an article
 */
exports.show = function(req, res) {
    res.jsonp(req.article);
};

/**
 * Show a phone
 */
exports.showPhone = function(req, res) {
    res.jsonp(req.phone);
};

/**
 * List of Articles
 */
exports.all = function(req, res) {
    Article.find().sort('-created').populate('user', 'name username').exec(function(err, articles) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(articles);
        }
    });
};

/**
 * List of phones
 */
exports.allPhones = function(req, res) {
    Phone.find().sort('-age').exec(function(err, phones) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(phones);
        }
    });
};


