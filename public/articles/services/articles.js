'use strict';


//Articles service used for articles REST endpoint
angular.module('mean.articles').factory('Orders', ['$resource', function($resource) {
    return $resource('orders/:orderId', {
        articleId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);

angular.module('mean.articles').factory('Phone', ['$resource', function($resource) {
    return $resource('/phones/:phoneId', {}, {});
}]);

angular.module('mean.articles').factory('session', ['$cookieStore', function ($cookieStore) {
        var Cart = [];
        if ($cookieStore.get('Cart')) { Cart = $cookieStore.get('Cart');}
        return {
            getCart: function () {
                return Cart;
            },
            setCart: function(cart) {
            	Cart = cart;
            },
            addToCart: function(item) {
            	Cart.push({'id': item.id, 'name': item.name});
            	$cookieStore.put('Cart', Cart);
            },
            removeFromCart: function(item) {
            	//console.log("looking for: " + item.id + " in Cart with length: " + Cart.length);
            	for (var i = 0; i < Cart.length; i++)
			   	{
			   		//console.log(i + " " + Cart[i].id);
			   		if (Cart[i].id === item.id) {
			      		Cart.splice(i,1);
			      		$cookieStore.put('Cart', Cart);
			      		return 0;
			   		}
			   	}
			   	return 1;
            },
            getCartSize: function(){
            	return Cart.length;
            }
        };
 }]);
