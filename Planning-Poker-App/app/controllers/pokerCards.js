var pokerCardsApp = angular.module('pokerCardsApp', ['PokerCardsModel', 'ngTouch']);


// Index: http://localhost/views/pokerCards/index.html

pokerCardsApp.controller('IndexCtrl', function ($scope, PokerCardsRestangular) {

  // Helper function for opening new webviews
  $scope.open = function(id) {
    webView = new steroids.views.WebView("/views/pokerCards/show.html?id="+id);
    steroids.layers.push(webView);
  };

  // Fetch all objects from the local JSON (see app/models/pokerCards.js)
  PokerCardsRestangular.all('pokerCards').getList().then( function(pokerCardss) {
    $scope.pokerCardss = pokerCardss;
  });

  // Native navigation
  steroids.view.navigationBar.show("PokerCards index");
  steroids.view.setBackgroundColor("#FFFFFF");

});


// Show: http://localhost/views/pokerCards/show.html?id=<id>

pokerCardsApp.controller('ShowCtrl', function ($scope, $filter, PokerCardsRestangular) {

  // Fetch all objects from the local JSON (see app/models/pokerCards.js)
  PokerCardsRestangular.all('pokerCards').getList().then( function(pokerCardss) {
    // Then select the one based on the view's id query parameter
    $scope.pokerCards = $filter('filter')(pokerCardss, {id: steroids.view.params['id']})[0];
  });

  // Native navigation
  steroids.view.navigationBar.show("PokerCards: " + steroids.view.params.id );
  steroids.view.setBackgroundColor("#FFFFFF");

});
