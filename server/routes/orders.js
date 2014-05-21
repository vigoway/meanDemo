'use strict';

// Articles routes use articles controller
var orders = require('../controllers/orders');
var authorization = require('./middlewares/authorization');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
    if (req.order.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.route('/orders')
        .get(orders.all)
        .post(authorization.requiresLogin, orders.create);
    app.route('/orders/:orderId')
        .get(orders.show)
        .put(authorization.requiresLogin, hasAuthorization, orders.update)
        .delete(authorization.requiresLogin, hasAuthorization, orders.destroy);

    // Finish with setting up the articleId param
    app.param('articleId', orders.order);

};