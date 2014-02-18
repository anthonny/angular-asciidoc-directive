'use strict';

angular.module('demo', ['aql.asciidoc', 'ui.ace'])

// Define Opal attributes and options
.constant('asciidocOpts', Opal.hash2(['options'], {'header_footer': true}))

.controller('demo', ['asciidocOpts', function(asciidocOpts){

	this.asciidocOpts = asciidocOpts;

	// The ui-ace option
	this.aceOption = {
		theme:'terminal',
		mode: 'asciidoc'
	}
}]);