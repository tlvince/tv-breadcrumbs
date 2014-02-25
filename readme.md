# tv-breadcrumbs

> Generate breadcrumbs from AngularUI router states

## Install

```bash
bower install tv-breadcrumbs
```

## Usage

1. Include the script:

    ```html
    <script src="bower_components/tv-breadcrumbs/dist/tv-breadcrumbs.min.js"></script>
    ```

2. Add `tv.breadcrumbs` as a module dependency:

    ```js
    angular.module('App', ['tv.breadcrumbs']);
    ```

3. Include the `tv-breadcrumbs` directive:

    ```html
    <div tv-breadcrumbs></div>
    ```

4. Optionally add a `label` property (used as a human-readable breadcrumb
   label) to a state's [custom data][data] object:

    ```js
    .state('home', {
      data: {
        label: 'Home',
      }
    }
    ```

[data]: https://github.com/angular-ui/ui-router/wiki#wiki-attach-custom-data-to-state-objects

## Alternatives

AngularUI Router-based:

* [ncuillery/angular-breadcrumb][ncuillery]
* [interval-braining/angular-ui-router-breadcrumbs][interval-braining]

[ncuillery]: https://github.com/ncuillery/angular-breadcrumb
[interval-braining]: https://github.com/interval-braining/angular-ui-router-breadcrumbs

## Author

© 2014 Tom Vincent <http://tlvince.com/contact>

## License

Released under the [MIT License](http://tlvince.mit-license.org).
