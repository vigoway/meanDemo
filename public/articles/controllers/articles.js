'use strict';

angular.module('mean.articles').controller('OrdersController', ['$scope', '$stateParams', '$location', 'Global', 'Orders', 
function ($scope, $stateParams, $location, Global, Orders) {
    $scope.global = Global;
    $scope.create = function() {
        var order = new Orders({
            products: this.products,
            total: this.total,
            shipped2: this.shipped2
        });
        order.$save(function(response) {
            $location.path('orders/' + response._id);
        });

        this.products = [];
        this.total = 0;
        this.shipped2 = '';
    };

    $scope.remove = function(order) {
        if (order) {
            order.$remove();

            for (var i in $scope.orders) {
                if ($scope.orders[i] === order) {
                    $scope.orders.splice(i, 1);
                }
            }
        }
        else {
            $scope.order.$remove();
            $location.path('orders');
        }
    };

    $scope.update = function() {
        var order = $scope.order;
        if (!order.updated) {
            order.updated = [];
        }
        order.updated.push(new Date().getTime());

        order.$update(function() {
            $location.path('orders/' + order._id);
        });
    };

    $scope.find = function() {
        Orders.query(function(orders) {
            $scope.orders = orders;
        });
    };

    $scope.findOne = function() {
        Orders.get({
            orderId: $stateParams.orderId
        }, function(order) {
            $scope.order = order;
        });
    };
}]);


angular.module('mean.articles').controller('PhonesController', ['$scope', '$stateParams', '$location', 'Global', 'Phone', '$cookieStore',
function ($scope, $stateParams, $location, Global, Phone, $cookieStore) {
    $scope.global = Global;
    $scope.phones = Phone.query();
    $scope.orderProp = 'age';
    $scope.cart = $cookieStore.get('Cart');
    if($scope.cart) {
      $scope.cartSize = $scope.cart.length;
    }
}]);


angular.module('mean.articles').controller('PhoneDetailsController', ['$scope', '$stateParams', '$location', 'Global', 'Phone', 'session', '$cookieStore',
function ($scope, $stateParams, $location, Global, Phone, session, $cookieStore) {
    
    $scope.findOnePhone = function() {
        Phone.get({
            phoneId: $stateParams.phoneId
        }, function(phone) {
            $scope.phone = phone;
        });
    };

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    };

    $scope.cart = $cookieStore.get('Cart');
    if($scope.cart) {
      $scope.cartSize = $scope.cart.length;
    }
    else{
      $scope.cartSize = 0;
    }    
    $scope.add = function(device) {
      session.addToCart(device);
      $scope.cartSize = session.getCartSize();
      console.log('size of cart is:'  + $scope.cartSize);
    };
}]);




angular.module('mean.articles').controller('CartController', ['$scope', '$stateParams', '$location', 'Global', 'Orders', 'session', '$cookieStore', 
function ($scope, $stateParams, $location, Global, Orders, session, $cookieStore) {
    $scope.cart = $cookieStore.get('Cart');
    if($scope.cart) {
      $scope.cartSize = $scope.cart.length;
    }
    else{
      $scope.cartSize = 0;
    }

    $scope.remove = function(device) {
      if(session.removeFromCart(device) !== 0) {alert('couldn\'t remove due to unknown error, try again later.');}
      else{
          $scope.cart = $cookieStore.get('Cart');
        }
    };

    $scope.submitOrder = function(){
        console.log('creating order');
        var cart = $cookieStore.get('Cart');
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();

        if(dd<10) {
            dd='0'+dd;
        } 

        if(mm<10) {
            mm='0'+mm;
        } 

        today = mm+'/'+dd+'/'+yyyy;



       var order = new Orders({
            products: cart,
            total: 400*cart.length,
            date: today,
            shipped2: '1 Brookings Dr. St Louis, MO 63130' //global.user.address
        });
        order.$save(function() {
            $cookieStore.put('Cart', '');
            $location.path('orders/');
        });

        this.products = [];
        this.total = 0;
        this.shipped2 = ''; 
    };
}]);