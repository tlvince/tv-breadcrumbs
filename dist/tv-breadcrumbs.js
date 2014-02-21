// tv-breadcrumbs - v0.1.0 - 2014-02-21
// © 2014 Tom Vincent <http://tlvince.com/contact>
// License: MIT
'use strict';
angular.module('tv.breadcrumbs', [
  'tv.breadcrumbs.tpls',
  'ui.router.state'
]).directive('tvBreadcrumbs', [
  '$rootScope',
  '$state',
  function ($rootScope, $state) {
    return {
      link: function (scope) {
        $rootScope.$on('$stateChangeSuccess', function () {
          var breadcrumbs = [];
          var addCrumb = function (state) {
            if (state.self.name && !state.self.abstract) {
              var name = state.self.name;
              if (state.self.data && state.self.data.label) {
                name = state.self.data.label;
              }
              breadcrumbs.push(name);
              addCrumb(state.parent);
            }
          };
          addCrumb($state.$current);
          scope.breadcrumbs = breadcrumbs.reverse();
        });
      },
      templateUrl: 'breadcrumb.html'
    };
  }
]);
angular.module('tv.breadcrumbs.tpls', ['breadcrumb.html']);
angular.module('breadcrumb.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('breadcrumb.html', '<ol class="breadcrumb" ng-if="breadcrumbs">\n' + '  <li ng-repeat="crumb in breadcrumbs">\n' + '    <a ng-if="!$last" ui-sref="{{crumb}}" ng-bind="crumb"></a>\n' + '    <span ng-if="$last" class="active" ng-bind="crumb"></span>\n' + '  </li>\n' + '</ol>\n' + '');
  }
]);