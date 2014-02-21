# angular-asciidoc-directive [![build status](https://api.travis-ci.org/anthonny/angular-asciidoc-directive.png)](https://travis-ci.org/anthonny/angular-asciidoc-directive)

Angular-asciidoc-directive use the project [asciidoctor.js](https://github.com/asciidoctor/asciidoctor.js) the javascript version of [AsciiDoctor](http://asciidoctor.org/) to generate the HTML render.

**Asciidoctor.js** couldn't work with **AngularJS** out of the box, **Opal**, the cross-compiler used to generate the JS file, add `$inject` method :

https://github.com/opal/opal/issues/400

To resolve the problem, the project use grunt and 'string-replace' to modify **asciidoctor.js** :

```
...
'string-replace': {
      options: {
        replacements: [
        {
          pattern: /(\$inject)/ig,
          replacement: '\$opalInject'
        }, 
        {
          pattern: /(\$scope)/ig,
          replacement: '\$opalScope'
        }
        ]
      },   
...
```

## Usage
1. `bower install angular-asciidoc-directive`
2. Include the `asciidoc.all.js` script into your app.
`opal.js` and `asciidoctor.js` are include and minify in the `asciidoc.all.js`.
3. Add `aql.asciidoc` as a module dependency to your app.
4. See examples/demo.html for usage

## License
MIT
