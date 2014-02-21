'use strict';

angular.module('demo', ['aql.asciidoc', 'ui.ace'])

// Define Opal attributes and options
.constant('asciidocOpts', Opal.hash2(['options'], {'header_footer': true}))

.controller('demo', ['asciidocOpts', '$http', function(asciidocOpts, $http){
	var app = this;

	$http({method: 'GET', url: 'demo.asciidoc'}).
		success(function(data, status, headers, config) {
			app.ascii = data;
	  	});


	app.asciidocOpts = asciidocOpts;

	/**
	 * Define transforme to change html generated with asciidoc
	 * @param  {angular.element} element [description]
	 * @return {html} html updated
	 */
	var urlImages = 'https://raw2.github.com/asciidoctor/asciidoctor.js/master/examples/';
	var urlLink = 'https://github.com/Nikku/asciidoc-samples/blob/master/';

	app.asciiTransformer = function(element) {
		element.find('a').not('[href^="http"]').each(function() {
			var el = angular.element(this)
			var href = el.attr('href');
			el.attr('href', urlLink+href)
		});

		element.find('img').not('[src^="http"]').each(function() {
			var el = angular.element(this);
			var srcImg = el.attr('src');
			el.attr('src',  urlImages+srcImg);
		});

		return element;
	}

	// The ui-ace option
	app.aceOption = {
		theme:'terminal',
		mode: 'asciidoc'
	}
}]);