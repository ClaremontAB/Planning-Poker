var settingsApp = angular.module('settingsApp', ['SettingsModel', 'ngTouch']);


// Index: http://localhost/views/settings/index.html

settingsApp.controller('IndexCtrl', function ($scope, SettingsRestangular) {

  // Helper function for opening new webviews
  $scope.open = function(id) {
    webView = new steroids.views.WebView("/views/settings/show.html?id="+id);
    steroids.layers.push(webView);
  };

  // Fetch all objects from the local JSON (see app/models/settings.js)
  SettingsRestangular.all('settings').getList().then( function(settingss) {
    $scope.settingss = settingss;
  });

  // Native navigation
  steroids.view.navigationBar.show("Settings index");
  steroids.view.setBackgroundColor("#FFFFFF");

});


// Show: http://localhost/views/settings/show.html?id=<id>

settingsApp.controller('ShowCtrl', function ($scope, $filter, SettingsRestangular) {

  // Fetch all objects from the local JSON (see app/models/settings.js)
  SettingsRestangular.all('settings').getList().then( function(settingss) {
    // Then select the one based on the view's id query parameter
    $scope.settings = $filter('filter')(settingss, {id: steroids.view.params['id']})[0];
  });

  // Native navigation
  steroids.view.navigationBar.show("Settings: " + steroids.view.params.id );
  steroids.view.setBackgroundColor("#FFFFFF");

});
