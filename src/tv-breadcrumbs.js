'use strict';

angular.module('tv.breadcrumbs', ['tv.breadcrumbs.tpls', 'ui.router.state'])
  .directive('tvBreadcrumbs', function($rootScope, $state) {
    return {
      restrict: 'AE',
      templateUrl: 'breadcrumb.html',
      link: function(scope, element, attrs) {
        $rootScope.$on('$stateChangeSuccess', function() {
          var breadcrumbs = [];

          var addCrumb = function(state) {
            var crumb = {};
            crumb.name = state.name;
            if(state.data && state.data.label) {
              crumb.label = state.data.label;
            }
            breadcrumbs.push(crumb);
          };

          var walkCrumbs = function(state) {
            if(state.self && state.self.name && !state.self.abstract) {
              addCrumb(state.self);
              walkCrumbs(state.parent);
            }
          };

          walkCrumbs($state.$current);

          if(attrs.home && $state.$current.self.name !== attrs.home) {
            var home = $state.get(attrs.home);
            if(home) {
              addCrumb(home);
            }
          }

          scope.breadcrumbs = breadcrumbs.reverse();
        });
      }
    };
  });

