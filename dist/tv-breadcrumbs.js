// tv-breadcrumbs - v0.1.1 - 2014-02-26
// https://github.com/tlvince/tv-breadcrumbs
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
      restrict: 'AE',
      templateUrl: 'breadcrumb.html',
      link: function (scope, element, attrs) {
        $rootScope.$on('$stateChangeSuccess', function () {
          var breadcrumbs = [];
          var addCrumb = function (state) {
            var crumb = {};
            crumb.name = state.name;
            if (state.data && state.data.label) {
              crumb.label = state.data.label;
            }
            breadcrumbs.push(crumb);
          };
          var walkCrumbs = function (state) {
            if (state.self && state.self.name && !state.self.abstract) {
              addCrumb(state.self);
              walkCrumbs(state.parent);
            }
          };
          walkCrumbs($state.$current);
          if (attrs.home && $state.$current.self.name !== attrs.home) {
            var home = $state.get(attrs.home);
            if (home) {
              addCrumb(home);
            }
          }
          scope.breadcrumbs = breadcrumbs.reverse();
        });
      }
    };
  }
]);
angular.module('tv.breadcrumbs.tpls', ['breadcrumb.html']);
angular.module('breadcrumb.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('breadcrumb.html', '<ol class="breadcrumb" ng-if="breadcrumbs">\n' + '  <li ng-repeat="crumb in breadcrumbs">\n' + '    <a ng-if="!$last" ui-sref="{{crumb.name}}"\n' + '      ng-bind="crumb.label ? crumb.label : crumb.name"></a>\n' + '    <span ng-if="$last" class="active"\n' + '      ng-bind="crumb.label ? crumb.label : crumb.name"></span>\n' + '  </li>\n' + '</ol>\n' + '');
  }
]);