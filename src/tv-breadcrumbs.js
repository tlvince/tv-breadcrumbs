'use strict';

angular.module('tv.breadcrumbs', ['tv.breadcrumbs.tpls', 'ui.router.state'])
  .directive('tvBreadcrumbs', function($rootScope, $state) {
    return {
      link: function(scope) {
        $rootScope.$on('$stateChangeSuccess', function() {
          var breadcrumbs = [];

          var addCrumb = function(state) {
            if(state.self.name && !state.self.abstract) {
              var name = state.self.name;
              if(state.self.data && state.self.data.label) {
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
  });

